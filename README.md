# Portfolio — Nathan Ian Comiso

Personal developer portfolio showcasing my tech stack and projects.
Live at: **https://exor10.github.io/portfolio_updated/**

Pure static site — no build step. HTML + CSS + vanilla JS, hosted on GitHub Pages.

## Adding repo links to projects

Every project card has a placeholder link that currently shows **"Repo coming soon"**.
To activate one:

1. Open `index.html`
2. Search for the project name (e.g. `Enomy-Finances`)
3. Just below it, find the line marked with a comment:

   ```html
   <!-- ⇩ Paste your repo URL in the href below -->
   <a class="repo-link" href="#" target="_blank" rel="noopener">View Repo</a>
   ```

4. Replace `#` with your repo URL:

   ```html
   <a class="repo-link" href="https://github.com/Exor10/enomy-finances" target="_blank" rel="noopener">View Repo</a>
   ```

5. Commit and push — the link automatically switches from "Repo coming soon" to an active "View Repo →".

## Structure

```
├── index.html      # all content (hero, tech stack, projects, contact)
├── css/style.css   # dark theme, animations, layout
└── js/main.js      # scroll reveals, nav highlighting, typing effect
```
