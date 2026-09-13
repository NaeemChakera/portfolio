# Portfolio — v1 scaffold

Retro-tech portfolio site with a light mode and a dark mode.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · React Three
Fiber / Three.js · Framer Motion

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces a production
build; deploy anywhere that supports Next.js (Vercel is the path of least
resistance and connects straight to a GitHub repo).

## What's real vs. placeholder

All content lives in one file: `src/lib/data.ts`. Everything marked `TODO`
is a placeholder and needs your real details before this goes live:

- **Experience** — the three entries (Morgan Library, At Your Service,
  Britken) are seeded from what you've mentioned, but dates and exact bullet
  wording are placeholders. Rewrite the `summary` for each with a real
  outcome, the way your resume pipeline already frames things.
- **Projects** — three empty slots. Swap in real projects, or point
  `projects` at a GitHub API call later to pull your repos automatically.
- **Socials** — GitHub / LinkedIn / email links are dummy URLs in
  `socials`.
- **Fact sheet** — "based in Fort Collins, CO" is a guess; confirm or
  change it.

## Structure

```
src/
  app/
    layout.tsx       fonts (JetBrains Mono + Space Grotesk), theme provider
    page.tsx          assembles all sections
    globals.css       color tokens for light/dark, CRT texture, blink keyframe
  components/
    nav.tsx           sticky nav, scroll-spy, theme toggle
    hero.tsx          boot-sequence animation + 3D terminal
    scene/
      terminal-scene.tsx   the R3F retro monitor
    about.tsx / experience.tsx / projects.tsx / contact.tsx / footer.tsx
    terminal-frame.tsx     reusable "terminal window" chrome
    section-heading.tsx    "$ command" style section labels
    theme-toggle.tsx       light/dark switch
  lib/
    data.ts           all site content — edit this file first
```

## Suggested next passes (kept out of v1 on purpose)

1. Wire up the GitHub API in `projects.tsx` to pull your pinned repos
   automatically instead of hand-editing `data.ts`.
2. Add a second, more elaborate 3D moment (e.g. a scene transition between
   sections, or particles) — v1 keeps the 3D to one deliberate piece in the
   hero.
3. Add a real contact form (e.g. via a form backend or serverless function)
   instead of `mailto:` links.
4. Swap the placeholder base location / résumé link for real ones.
