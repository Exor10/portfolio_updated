# Portfolio — Nathan Ian Comiso

Personal developer portfolio showcasing my tech stack and projects.
Live at: **https://exor10.github.io/portfolio_updated/**

Built with Next.js, React, TypeScript and Tailwind CSS, exported as a static
site and hosted on GitHub Pages.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000/portfolio_updated
npm run lint
npm run build    # static site in out/
```

## Adding or editing projects

All projects live in one file: **`content/projects.ts`**.

- `featuredProjects` are the big cards, `moreProjects` the list rows below them.
- Give a project `repo: "https://github.com/Exor10/…"` to link its repo, or
  `live: "https://…"` to link a live site instead.
- Set `privateRepo: true` for a private repo: the project shows "Private repo"
  instead of a link (a link would 404 for visitors).
- Set `repo: null` for a project with no repo at all: it shows no link.
- Projects with neither `live` nor `repo` link to this portfolio repo
  (`DEFAULT_REPO`) for now.

The tech stack works the same way in **`content/stack.ts`**.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which lints, builds
and publishes `out/` to GitHub Pages. Pull requests run the same lint and
build without publishing.

This needs **Settings → Pages → Build and deployment → Source: GitHub Actions**
on the repo.

## Structure

```
├── app/
│   ├── layout.tsx      # fonts (Geist via next/font), icons, page metadata
│   ├── page.tsx        # puts the sections together
│   └── globals.css     # design tokens (Tailwind theme), glitch + flip styles
├── components/         # header, hero, sections, footer
│   ├── GlitchName.tsx  # hero name glitch decode
│   └── FlipTitle.tsx   # "Learning as a ___" flip-clock title
├── content/
│   ├── projects.ts     # ⇦ projects and their links
│   └── stack.ts        # ⇦ tech stack
└── next.config.ts      # static export under /portfolio_updated
```
