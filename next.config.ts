import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // plain HTML/CSS/JS in out/, deployed to GitHub Pages by .github/workflows/deploy.yml
  output: "export",
  // the site lives at exor10.github.io/portfolio_updated/
  basePath: "/portfolio_updated",
  // no cacheComponents / partialPrefetching: Partial Prerendering can't run in
  // export mode, and a fully static page has nothing for them to do
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
