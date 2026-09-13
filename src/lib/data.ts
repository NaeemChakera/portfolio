export const profile = {
  name: "Naeem Chakera",
  role: "Computer Engineering Student",
  focus: "CE · Web · IT Support",
  school: "Colorado State University",
  status: "Open to software, CE & IT support internships",
};

export const bio = `I'm a Computer Engineering student at ${profile.school} who likes sitting
at the point where hardware, software, and the person using them all meet.
That's meant clearing a Secure Boot failure at the chassis level, deploying
a POS system from scratch for a hardware store in Mombasa, and building the
web presence for a local dessert cafe — always translating a technical fix
into something a non-technical person can trust.`;

export const factSheet = [
  { label: "based", value: "Fort Collins, CO" },
  { label: "school", value: "Colorado State University" },
  { label: "track", value: "Computer Engineering — Expected Spring 2028" },
  { label: "orgs", value: "RamVentures · DevNet · ASCSU" },
  { label: "languages", value: "Trilingual" },
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
    period: "Feb 2025 — Present",
    role: "IT Support Intern",
    org: "Morgan Library, CSU",
    summary:
      "Resolve hardware and account issues at the front line — from clearing a Secure Boot/BIOS failure at the chassis level to administering user accounts in Active Directory. Built a library of 20+ FreshService canned responses so users get a complete fix without a follow-up ticket.",
    tags: ["Active Directory", "FreshService", "Hardware Diagnostics"],
  },
  {
    period: "Mar 2025 — Jun 2025",
    role: "STEM Outreach Intern / Instructor",
    org: "Little Shop of Physics, CSU",
    summary:
      "Delivered hands-on physics demonstrations for K-12 students and trained fellow volunteers in soldering and breadboard assembly. Planned station staffing and visitor flow for a 100+ attendee Open House.",
    tags: ["STEM Outreach", "Soldering", "Event Planning"],
  },
  {
    period: "Mar 2021 — Aug 2023",
    role: "Technology and Operations Consultant",
    org: "At Your Service Ltd.",
    summary:
      "Helped deploy a uniCenta POS system on a MySQL backend, structuring product, category, and stock tables to replace paper-based inventory. Trained staff to run sales and stock reporting independently.",
    tags: ["POS Deployment", "MySQL", "Training"],
  },
  {
    period: "Jun 2023 — Aug 2023",
    role: "Digital Systems Intern",
    org: "Overdrive Ltd.",
    summary:
      "Analyzed product data to surface new opportunities for the business and kept computers and printers running with detailed service reports.",
    tags: ["Data Analysis", "Hardware Repair"],
  },
  {
    period: "Jun 2019 — Aug 2019",
    role: "Website Developer & Digital Marketing Volunteer",
    org: "Dahlia Cerebral Palsy C.B.O.",
    summary:
      "Built a website for the non-profit and helped organize charity events to raise funds and awareness.",
    tags: ["Web Dev", "Volunteer"],
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
    name: "Visa-Appointment-Finder",
    description:
      "Automates checking visa appointment slots so users don't have to sit and refresh the scheduling portal manually — scripted login flow, repeated checks, and notifications when earlier dates open up.",
    tags: ["Python", "Automation", "Web Scraping"],
    href: "https://github.com/NaeemChakera/US-Visa-Appointment-Finder",
  },
  {
    name: "Cakeology-Bakery",
    description:
      "Web presence and product catalog for a dessert business, turning a real shop's menu into a browsable, mobile-friendly online catalog.",
    tags: ["HTML", "CSS", "Branding"],
    href: "https://github.com/NaeemChakera/cakeologyke",
  },
  {
    name: "Vomit-Scrapper",
    description:
      "Web scraping project that parses messy HTML into structured data, handling pagination, selectors, and rate limiting on fragile page structures.",
    tags: ["Python", "Web Scraping"],
    href: "https://github.com/NaeemChakera/Vomit-Scrapper",
  },
  {
    name: "Dynamo-Powered Bike Charger",
    description:
      "ECE 202 design project: measured a bike dynamo's raw AC output across pedaling speeds, then integrated an LM2596 buck converter to turn the fluctuating output into a stable, speed-independent voltage.",
    tags: ["Analog Circuits", "LM2596", "Hardware"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/NaeemChakera" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/naeemchakera/" },
  { label: "Email", href: "mailto:chakeranaeem@gmail.com" },
];
