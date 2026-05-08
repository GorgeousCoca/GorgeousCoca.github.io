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
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  images: {
    remotePatterns: [],
    qualities: [60, 75, 90],
    unoptimized: isGithubActions
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' data: blob: https:; media-src 'self' blob: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; frame-src 'self' https://www.google.com https://www.google.ru; font-src 'self' data:; base-uri 'self'; form-action 'self'"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
