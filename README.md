# Portfolio — v1

Retro-tech portfolio site with a light mode and a dark mode, built from
Naeem Chakera's resume and existing site content (naeem.chakera.uk).

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces a production
build; deploy anywhere that supports Next.js (Vercel is the path of least
resistance and connects straight to a GitHub repo).

## Deploy to GitHub Pages

This repository is configured to export a static site and deploy it with
GitHub Actions. Push the changes to the `main` branch, then open the
repository's **Settings > Pages** and set **Source** to **GitHub Actions**.

The workflow in `.github/workflows/deploy.yml` builds the site and publishes
the `out` directory. Once it finishes, the site will be available at
https://naeemchakera.github.io/portfolio/.

## Content

All site copy lives in one file: `src/lib/data.ts` — profile info, bio,
experience, projects, and social links. Experience and the three GitHub
projects (US-Visa-Appointment-Finder, cakeologyke, Vomit-Scrapper) are
pulled from the real resume and naeem.chakera.uk. Update this one file to
change anything on the site.

## Structure

```
src/
  app/
    layout.tsx       fonts (JetBrains Mono + Space Grotesk), theme provider
    page.tsx          assembles all sections
    globals.css       color tokens for light/dark, CRT texture, blink keyframe
  components/
    nav.tsx           sticky nav, scroll-spy, theme toggle
    hero.tsx          boot-sequence terminal animation
    about.tsx / experience.tsx / projects.tsx / contact.tsx / footer.tsx
    terminal-frame.tsx     reusable "terminal window" chrome
    section-heading.tsx    "$ command" style section labels
    theme-toggle.tsx       light/dark switch
  lib/
    data.ts           all site content — edit this file first
```

## Suggested next passes

1. Wire up the GitHub API in `projects.tsx` to pull repos automatically
   instead of hand-editing `data.ts`, and pull real screenshots/thumbnails.
2. Add a real contact form (e.g. via a form backend or serverless function)
   instead of `mailto:` links.
3. Bring over the profile photo and additional project screenshots from
   naeem.chakera.uk.
