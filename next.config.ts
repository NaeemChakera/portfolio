import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — required for GitHub Pages, which only serves static files.
  output: "export",
  // GitHub Pages serves /path/index.html for /path/, so trailing slashes
  // avoid broken links between sections.
  trailingSlash: true,
};

export default nextConfig;
