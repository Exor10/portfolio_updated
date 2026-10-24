<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Shipping changes

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages, so merging a PR publishes it. Run `npm run lint` and `npm run build` before pushing.

### When to merge without asking

Merge a **small tweak** yourself once its PR's `build` check passes, then confirm that the deploy run on `main` succeeds. Small tweaks are:

- text and copy changes
- adding, removing or editing projects (`content/projects.ts`) and tech-stack items (`content/stack.ts`)
- colours, spacing, labels and links
- adjustments to an existing component, such as the Say Hello RGB ring or the title flip timing

Open a PR and wait for the owner's go-ahead before merging anything else, including:

- new sections or pages
- redesigns
- dependency or framework upgrades
- changes to the deploy workflow or hosting setup
- anything that removes a feature
