import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — required for GitHub Pages, which only serves static files.
  output: "export",
  // GitHub Pages serves /path/index.html for /path/, so trailing slashes
  // avoid broken links between sections.
  trailingSlash: true,
  // This is a *project* page (github.com/NaeemChakera/portfolio ->
  // naeemchakera.github.io/portfolio/), not a user/org page or a custom
  // domain, so every asset and route needs the /portfolio prefix.
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
