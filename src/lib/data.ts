// Placeholder content. Real specifics (dates, exact titles, metrics) are
// marked with TODO — swap them in from your actual resume before shipping.

export const profile = {
  name: "Naeem",
  role: "Computer Engineering Student",
  focus: "Technical Support · B2B SaaS",
  school: "Colorado State University",
  status: "Open to internships — Summer 2027",
};

export const bio = `I'm a Computer Engineering student at ${profile.school}, and I like the
part of software where hardware, systems, and people meet. I'm most at home
diagnosing a problem, tracing it to its root cause, and explaining the fix in
plain language — which is what pulled me toward technical support and B2B
SaaS over pure engineering roles.`;

export const factSheet = [
  { label: "based", value: "Fort Collins, CO" }, // TODO: confirm
  { label: "school", value: "Colorado State University" },
  { label: "track", value: "Computer Engineering (ECE)" },
  { label: "orgs", value: "RamVentures · DevNet · ASCSU" },
];

export type ExperienceEntry = {
  period: string;
  role: string;
  org: string;
  summary: string;
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: "TODO — Present", // TODO: confirm dates
    role: "Tier 1 IT Support",
    org: "Morgan Library",
    summary:
      "Front-line technical support for library patrons and staff — triaging hardware and account issues, documenting fixes, and escalating what Tier 1 couldn't resolve.",
    tags: ["Help Desk", "Troubleshooting", "Documentation"],
  },
  {
    period: "TODO", // TODO: confirm dates
    role: "POS System Deployment",
    org: "At Your Service",
    summary:
      "Deployed and configured point-of-sale systems on-site, trained staff on the new workflow, and handled the inevitable day-one issues in person.",
    tags: ["Deployment", "Hardware", "Client Training"],
  },
  {
    period: "TODO", // TODO: confirm dates
    role: "Project Contributor",
    org: "Britken",
    summary:
      "Contributed to project growth initiatives. Add the specific metric here — what grew, by how much, and what you did to move it.",
    tags: ["Growth", "Project Work"],
  },
];

export type ProjectEntry = {
  name: string;
  description: string;
  tags: string[];
  href?: string;
};

export const projects: ProjectEntry[] = [
  {
    name: "Project One",
    description:
      "Replace with a real project — one sentence on the problem it solves and the stack you used.",
    tags: ["TODO", "Stack"],
  },
  {
    name: "Project Two",
    description:
      "Replace with a real project — what a visitor would actually use it for.",
    tags: ["TODO", "Stack"],
  },
  {
    name: "Project Three",
    description:
      "Replace with a real project, or link out to your GitHub for the full archive.",
    tags: ["TODO", "Stack"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/TODO" },
  { label: "LinkedIn", href: "https://linkedin.com/in/TODO" },
  { label: "Email", href: "mailto:TODO@example.com" },
];
