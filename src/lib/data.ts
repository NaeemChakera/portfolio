export const profile = {
  name: "Naeem Chakera",
  role: "Computer Engineering Student",
  focus: "CE · Embedded · Applied AI",
  school: "Colorado State University",
  status: "Open to CE, embedded & AI engineering internships",
};

export const bio = `I'm a Computer Engineering student at ${profile.school} who builds across
the stack — from microcontrollers to mixed reality — and treats AI agents as
teammates, not autocomplete.

Right now that means working to get cFS flight software running on FreeRTOS
on an STM32 for CSU's CubeSat Subsystems Team, and building a Meta Quest 3 app
with Android XR at Sairyo, mentored by Fazal Sadikali. AI agents help me
prototype, debug, and ship faster; I own the engineering decisions.`;

export const factSheet = [
  { label: "based", value: "Fort Collins, CO" },
  { label: "school", value: "Colorado State University" },
  { label: "track", value: "Computer Engineering — Expected Spring 2028" },
  { label: "orgs", value: "UTFAB · RamVentures · DevNet · ASCSU" },
  { label: "interests", value: "AI agents · Embedded · Startups · Mountain biking" },
  { label: "languages", value: "Trilingual" },
];

export type ExperienceEntry = {
  period: string;
  role: string;
  org: string;
  summary: string;
  tags: string[];
  dividerBefore?: string;
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
    dividerBefore: "additional work & volunteering",
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
  /** A github.com/NaeemChakera/<repo> link pulls that repo's README at build time. */
  href?: string;
  /** Live site to show in the popup. Overrides the repo's GitHub "Website" field. */
  homepage?: string;
};

// Only repos of yours that you've starred on GitHub appear on the site
// (see src/lib/github.ts). Star a repo to add it, unstar to remove it.
export const GITHUB_USER = "NaeemChakera";

// Starred repos to keep off the site anyway (spacing/case/dashes ignored).
export const hiddenRepos: string[] = ["Ebooks for Cambridge"];

export const projects: ProjectEntry[] = [
  {
    name: "CubeSat Flight Software",
    description:
      "Bringing up cFS flight software on FreeRTOS on an STM32 for CSU's CubeSat Subsystems Team — board bring-up, RTOS integration, and getting a flight software framework running on bare-metal hardware.",
    tags: ["STM32", "FreeRTOS", "cFS", "In progress"],
  },
  {
    name: "Meta Quest 3 App — Sairyo",
    description:
      "Developing a Meta Quest 3 app with Android XR for Sairyo, mentored by Fazal Sadikali, using AI agents to speed up prototyping and iteration.",
    tags: ["Android XR", "Meta Quest 3", "AI Agents", "In progress"],
  },
  {
    name: "Visa-Appointment-Finder",
    description:
      "Automates checking U.S. visa appointment slots so users don't have to sit and refresh the scheduling portal manually — scripted login flow, repeated checks, and notifications when earlier dates open up.",
    tags: ["Python", "Automation", "Web Scraping"],
    href: "https://github.com/NaeemChakera/Visa-Appointment-Finder",
  },
  {
    name: "cakeologyke",
    description:
      "Web presence and product catalog for a dessert business, turning a real shop's menu into a browsable, mobile-friendly online catalog.",
    tags: ["HTML", "CSS", "Branding"],
    href: "https://github.com/NaeemChakera/cakeologyke",
  },
  {
    name: "RealEstateVOmit",
    description:
      "Scrapes real estate listings into clean, structured datasets — pagination, field extraction, de-duplication — and turns selected properties into printable PDF reports for agents and clients, served from a live web app.",
    tags: ["Python", "Web Scraping", "Next.js", "PDF Reports"],
    href: "https://github.com/NaeemChakera/RealEstateVOmit",
    homepage: "https://revom.vercel.app/",
  },
  {
    name: "Python-PDF-Reader",
    description:
      "A desktop tool that reads any PDF aloud — pick a file with a Tkinter dialog, pull text page-by-page with PyPDF2, and have pyttsx3 speak it back.",
    tags: ["Python", "PyPDF2", "Text-to-Speech"],
    href: "https://github.com/NaeemChakera/Python-PDF-Reader",
  },
  {
    name: "Facial Recognition Project",
    description:
      "Compares two photos to determine whether they show the same person — detects faces, generates encodings, and reports a match distance with bounding boxes drawn over each face.",
    tags: ["Python", "OpenCV", "dlib"],
    href: "https://github.com/NaeemChakera/Facial-Recognition-Project",
  },
  {
    name: "Light Switch Plate",
    description:
      "Designed a custom light switch plate to house multiple 2-gang switches flush with the wall, iterating the geometry in CAD and testing 3D-printed versions until it fit. The finished plate is now made and live at Reinvented Works.",
    tags: ["SketchUp", "CAD", "3D Printing"],
    href: "https://github.com/NaeemChakera/Reinvented-Works",
    homepage: "https://reinvented.works/",
  },
  {
    name: "POS System Tester & Trainer",
    description:
      "Tested the new uniCenta POS workflow end-to-end before go-live, then trained hardware-store staff hands-on until they could run sales, inventory, and reporting on their own.",
    tags: ["POS Testing", "Training", "QA"],
  },
];

export type LeadershipEntry = {
  role: string;
  org: string;
  summary: string;
};

export const leadership: LeadershipEntry[] = [
  {
    role: "Associate Voting Member",
    org: "UTFAB · College of Engineering, CSU",
    summary:
      "Review and vote on how student technology fee funding is spent across the College of Engineering — weighing proposals for the tools and labs students actually use.",
  },
  {
    role: "Member",
    org: "ASCSU",
    summary:
      "Part of Associated Students of CSU, the student government that represents students to the university.",
  },
  {
    role: "Member",
    org: "RamVentures · DevNet",
    summary:
      "Involved in CSU's student entrepreneurship and developer communities — pitching ideas, building with other students, and keeping up with new tools.",
  },
  {
    role: "Volunteer Trainer",
    org: "Little Shop of Physics, CSU",
    summary:
      "Trained fellow volunteers in soldering and breadboard assembly, and planned station staffing and visitor flow for a 100+ attendee Open House.",
  },
];

export type PostEntry = {
  title: string;
  summary: string;
  tags: string[];
  /** The post's LinkedIn link (the "Copy link to post" URL works). */
  href: string;
};

// LinkedIn posts, shown in their own section. Clicking one opens the post
// embedded in a popup. To add one: on LinkedIn, open the post's "..." menu,
// "Copy link to post", and paste it as href.
export const posts: PostEntry[] = [
  {
    title: "Dynamo-Powered Bike Charger",
    summary:
      "ECE 202 design project: measured a bike dynamo's raw AC output across pedaling speeds, then integrated an LM2596 buck converter to turn the fluctuating output into a stable, speed-independent voltage.",
    tags: ["Analog Circuits", "LM2596", "Hardware"],
    href: "https://www.linkedin.com/posts/naeemchakera_computerengineering-csu-hardwaredesign-activity-7511597831112093696-L0PL?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADOm-8wBjpd2OdfddJYrY2rVcJeys9FkalQ",
  },
  {
    title: "Toyota Hilux Bike Rack",
    summary:
      "Designed drag-reducing rack geometry and universal mounting clamps in Blender as a cost-effective alternative to imported racks, then fabricated it with local craftsmen from welded metal tubing and validated its load-bearing safety.",
    tags: ["Blender", "CAD", "Fabrication"],
    href: "https://www.linkedin.com/posts/naeemchakera_cad-mechanicaldesign-productdesign-activity-7511611582980718592-g9UD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADOm-8wBjpd2OdfddJYrY2rVcJeys9FkalQ",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/NaeemChakera" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/naeemchakera/" },
  { label: "Email", href: "mailto:chakeranaeem@gmail.com" },
];
