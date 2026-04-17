import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const [repositoryOwner = "", repositoryName = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isUserPagesRepo =
  repositoryOwner && repositoryName && repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const basePath = isGithubActions && repositoryName && !isUserPagesRepo ? `/${repositoryName}` : "";

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
