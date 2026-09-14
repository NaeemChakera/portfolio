# Portfolio — v1

Retro-tech portfolio site with a light mode and a dark mode, built from
Naeem Chakera's resume and existing site content (naeem.chakera.uk).

**Stack:** Next.js (App Router, static export) · TypeScript · Tailwind CSS v4
· Framer Motion

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Colors

Light/dark tokens in `src/app/globals.css` are pulled directly from the
[Atlassian Design System color palette](https://atlassian.design/foundations/color/color-palette):
the Neutral/DarkNeutral ramps for backgrounds, text, and borders, and the
Green ramp for the terminal accent (Orange for the secondary accent). Light
and dark values follow Atlassian's documented symmetry rule — a light-mode
700 shade becomes the equivalent 400 shade in dark mode — so the two themes
stay visually consistent instead of being tuned independently.

## Content

All site copy lives in `src/lib/data.ts` — profile info, bio, experience,
projects, and social links. Update this one file to change anything on the
site. A couple of notes on the current content:

- The Experience timeline has a small divider before "Digital Systems
  Intern · Overdrive Ltd." — that entry and the one after it are the more
  community/volunteer-flavored roles from the resume. The divider label
  (`entry.dividerBefore` in `data.ts`) is easy to delete if you'd rather not
  call it out at all.
- Projects mixes real GitHub repos (US-Visa-Appointment-Finder, cakeologyke,
  Vomit-Scrapper, Python-PDF-Reader, Facial-Recognition-Project) with
  hands-on hardware/CAD work (Toyota Hilux Bike Rack, Light Switch Plate,
  the ECE 202 dynamo charger) and the POS testing/training work at At Your
  Service.

## Deploying to GitHub Pages

This project is already configured for it:

- `next.config.ts` sets `output: "export"` (GitHub Pages only serves static
  files, no Node server), `trailingSlash: true`, and `basePath: "/portfolio"`
  / `assetPrefix: "/portfolio/"` — required because this is a **project
  page** (`naeemchakera.github.io/portfolio/`), not a user/org page.
- `.github/workflows/deploy.yml` builds the site and publishes it via
  GitHub's official Pages Actions on every push to `main`.

Steps:

1. Push this project to a GitHub repo named `portfolio` under your account
   (so the URL matches `naeemchakera.github.io/portfolio/`). If you already
   have a private repo with this name, either make it public or upgrade to
   a plan that supports Pages on private repos — GitHub Pages on the free
   tier only publishes from public repositories.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab). The
   site publishes automatically after each build succeeds, at
   `https://naeemchakera.github.io/portfolio/`.
4. **Custom domain (optional)** — if you'd rather have this at
   naeem.chakera.uk instead: remove `basePath`/`assetPrefix` from
   `next.config.ts` (a custom domain serves from the root, not
   `/portfolio/`), add a file `public/CNAME` containing just
   `naeem.chakera.uk`, then set that domain under
   **Settings → Pages → Custom domain**. Don't do both at once — basePath
   and a root custom domain are mutually exclusive.

## Structure

```
src/
  app/
    layout.tsx       fonts (JetBrains Mono + Space Grotesk), theme provider
    page.tsx          assembles all sections
    globals.css       Atlassian-sourced color tokens, CRT texture, blink keyframe
  components/
    nav.tsx           sticky nav, scroll-position active-link tracking, theme toggle
    hero.tsx          boot-sequence terminal animation
    about.tsx / experience.tsx / projects.tsx / contact.tsx / footer.tsx
    terminal-frame.tsx     reusable "terminal window" chrome
    section-heading.tsx    "$ command" style section labels
    theme-toggle.tsx       light/dark switch
  lib/
    data.ts           all site content — edit this file first
.github/workflows/deploy.yml   GitHub Pages deployment
```

## Suggested next passes

1. Wire up the GitHub API in `projects.tsx` to pull repos automatically
   instead of hand-editing `data.ts`.
2. Add a real contact form instead of `mailto:` links.
3. Bring over the profile photo and project screenshots from
   naeem.chakera.uk.
