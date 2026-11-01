import type { Element, Root } from "hast";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import {
  GITHUB_USER,
  hiddenRepos,
  projects as curatedProjects,
  type ProjectEntry,
} from "@/lib/data";

// Build-time GitHub data. Everything here runs once during `next build`
// (the page is statically exported), so visitors never hit the GitHub API.
//
// It must never break the build: any failure (rate limit, outage, no
// network) falls back to the hand-written `projects` in data.ts.

export type Project = ProjectEntry & {
  /** Sanitized README HTML, pre-rendered at build time. */
  readmeHtml?: string;
  /** github.com URL of the repo, if this project has one. */
  repoUrl?: string;
  /** Live site; when set the popup shows it in an iframe. */
  homepage?: string;
  /** False when the site sends headers that forbid embedding it. */
  embeddable?: boolean;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  default_branch: string;
  owner: { login: string };
};

// GitHub Actions sets GITHUB_API_URL itself; locally it defaults to the
// public API. Overriding it also lets you point the build at a mock.
const API = process.env.GITHUB_API_URL || "https://api.github.com";
const TIMEOUT_MS = 10_000;

function headers(accept = "application/vnd.github+json") {
  const h: Record<string, string> = {
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "naeem-portfolio-build",
  };
  // Optional locally (60 req/hour without it); in the deploy workflow the
  // built-in secrets.GITHUB_TOKEN is passed in.
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

/**
 * Your own repos that you've starred on GitHub. Starring a repo is the
 * on/off switch for showing it on the site; everything else is ignored.
 */
async function fetchStarredOwnRepos(): Promise<GitHubRepo[]> {
  const all: GitHubRepo[] = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `${API}/users/${GITHUB_USER}/starred?per_page=100&page=${page}`,
      { headers: headers(), signal: AbortSignal.timeout(TIMEOUT_MS) },
    );
    if (!res.ok) throw new Error(`GitHub starred: HTTP ${res.status}`);
    const batch: GitHubRepo[] = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all.filter(
    (r) => r.owner.login.toLowerCase() === GITHUB_USER.toLowerCase(),
  );
}

async function fetchReadme(repo: string): Promise<string | undefined> {
  try {
    const res = await fetch(`${API}/repos/${GITHUB_USER}/${repo}/readme`, {
      headers: headers("application/vnd.github.raw+json"),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return undefined; // 404 = repo has no README
    return await res.text();
  } catch {
    return undefined;
  }
}

/**
 * Checks whether a site lets other origins put it in an iframe, by looking
 * at X-Frame-Options and CSP frame-ancestors. If the check itself fails we
 * assume it's embeddable; the popup always offers "open in new tab" anyway.
 */
async function isEmbeddable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const xfo = res.headers.get("x-frame-options")?.toLowerCase();
    if (xfo && (xfo.includes("deny") || xfo.includes("sameorigin"))) {
      return false;
    }
    const csp = res.headers.get("content-security-policy")?.toLowerCase();
    const ancestors = csp?.match(/frame-ancestors([^;]*)/)?.[1]?.trim();
    if (ancestors && !ancestors.includes("*")) {
      // Only an explicit allow-list containing our own domain would work.
      return ancestors.includes("chakera.uk");
    }
    return true;
  } catch {
    return true;
  }
}

/**
 * Rewrites relative URLs in a README so they still work outside GitHub:
 * images point at raw.githubusercontent.com, links at github.com/blob.
 * External links open in a new tab.
 */
function rehypeGithubUrls(options: { repo: string; branch: string }) {
  const { repo, branch } = options;
  const rawBase = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/${branch}/`;
  const blobBase = `https://github.com/${GITHUB_USER}/${repo}/blob/${branch}/`;
  const isRelative = (url: string) =>
    !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url);
  const resolve = (url: string, base: string) =>
    new URL(url.replace(/^\.?\//, ""), base).toString();

  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const props = node.properties;
      if (node.tagName === "img" && typeof props.src === "string") {
        if (isRelative(props.src)) props.src = resolve(props.src, rawBase);
        props.loading = "lazy";
      }
      if (node.tagName === "a" && typeof props.href === "string") {
        if (props.href.startsWith("#")) return;
        if (isRelative(props.href)) props.href = resolve(props.href, blobBase);
        props.target = "_blank";
        props.rel = ["noopener", "noreferrer"];
      }
    });
  };
}

async function renderReadme(markdown: string, repo: string, branch: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    // READMEs often use raw HTML (<p align="center"><img ...>); parse it,
    // then sanitize everything so no scripts/handlers survive.
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        img: [...(defaultSchema.attributes?.img ?? []), "width", "height", "align"],
        p: [...(defaultSchema.attributes?.p ?? []), "align"],
        div: [...(defaultSchema.attributes?.div ?? []), "align"],
      },
    })
    // Runs after sanitizing, and only ever produces https URLs.
    .use(rehypeGithubUrls, { repo, branch })
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

function repoNameFromUrl(url?: string) {
  const match = url?.match(
    new RegExp(`^https://github\\.com/${GITHUB_USER}/([^/?#]+)`, "i"),
  );
  return match?.[1];
}

async function enrich(entry: ProjectEntry, repo?: GitHubRepo): Promise<Project> {
  const homepage = entry.homepage ?? (repo?.homepage || undefined);
  const [readme, embeddable] = await Promise.all([
    repo ? fetchReadme(repo.name) : undefined,
    homepage ? isEmbeddable(homepage) : undefined,
  ]);
  let readmeHtml: string | undefined;
  if (readme && repo) {
    try {
      readmeHtml = await renderReadme(readme, repo.name, repo.default_branch);
    } catch (err) {
      console.warn(`[github] could not render README for ${repo.name}:`, err);
    }
  }
  return {
    ...entry,
    repoUrl: repo?.html_url ?? (repoNameFromUrl(entry.href) ? entry.href : undefined),
    homepage,
    embeddable,
    readmeHtml,
  };
}

let cached: Promise<Project[]> | undefined;

/**
 * Only repos you've starred on GitHub are shown. Hand-curated projects
 * in data.ts come first (your order and wording, plus README and homepage
 * from GitHub) — a curated GitHub project you haven't starred is dropped,
 * while curated projects with no repo (LinkedIn posts, hardware) always
 * stay. Any other starred repo of yours is appended, so starring a repo
 * adds it on the next scheduled rebuild and unstarring removes it.
 */
export function getProjects(): Promise<Project[]> {
  cached ??= loadProjects();
  return cached;
}

async function loadProjects(): Promise<Project[]> {
  let repos: GitHubRepo[];
  try {
    repos = await fetchStarredOwnRepos();
  } catch (err) {
    console.warn(
      "[github] falling back to hand-written projects:",
      err instanceof Error ? err.message : err,
    );
    return curatedProjects.map((p) => ({
      ...p,
      repoUrl: repoNameFromUrl(p.href) ? p.href : undefined,
    }));
  }

  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  const used = new Set<string>();

  const host = (url?: string | null) => {
    try {
      return url ? new URL(url).hostname.replace(/^www\./, "") : undefined;
    } catch {
      return undefined;
    }
  };

  const curated = curatedProjects.flatMap((entry) => {
    const name = repoNameFromUrl(entry.href)?.toLowerCase();
    // Match by repo link, or by website: a curated entry whose homepage is
    // the same site as a starred repo's "Website" absorbs that repo (e.g.
    // Light Switch Plate <- the reinvented.works repo).
    const repo = name
      ? byName.get(name)
      : entry.homepage
        ? repos.find((r) => host(r.homepage) === host(entry.homepage))
        : undefined;
    if (name && !repo) return []; // GitHub project you haven't starred: hidden
    if (repo) used.add(repo.name.toLowerCase());
    return [enrich(entry, repo)];
  });

  // "Ebooks for Cambridge" matches the repo ebooks-for-cambridge etc.
  const normalize = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, "");
  const hidden = new Set(hiddenRepos.map(normalize));

  const extras = repos
    .filter((r) => !used.has(r.name.toLowerCase()) && !hidden.has(normalize(r.name)))
    .map((r) =>
      enrich(
        {
          name: r.name,
          description: r.description ?? "No description yet.",
          tags: [r.language, ...(r.topics ?? [])]
            .filter((t): t is string => Boolean(t))
            .slice(0, 4),
          href: r.html_url,
        },
        r,
      ),
    );

  return Promise.all([...curated, ...extras]);
}
