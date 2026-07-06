# Portfolio — Nathan Ian Comiso

Personal developer portfolio showcasing my tech stack and projects.
Live at: **https://exor10.github.io/portfolio_updated/**

Pure static site — no build step. HTML + CSS + vanilla JS, hosted on GitHub Pages.

## Adding repo links to projects

All repo links are configured in one file: **`js/repos.js`**.

Each project has an entry there. Paste your repo URL between the quotes:

```js
const PROJECT_REPOS = {
  "enomy-finances": "https://github.com/Exor10/enomy-finances",  // ← done
  "attendance-scanner": "",                                      // ← still empty
  ...
};
```

Projects left as `""` link to this portfolio repo (`DEFAULT_REPO`) in the meantime.
Commit and push — done.

## Structure

```
├── index.html      # all content (hero, tech stack, projects, contact)
├── css/style.css   # dark theme, animations, layout
├── js/repos.js     # ⇦ paste project repo URLs here
└── js/main.js      # scroll reveals, nav highlighting, typing effect
```
