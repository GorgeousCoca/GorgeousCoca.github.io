import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubActions && repositoryName ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  trailingSlash: isGithubActions,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    remotePatterns: [],
    unoptimized: isGithubActions
  }
};

export default nextConfig;
