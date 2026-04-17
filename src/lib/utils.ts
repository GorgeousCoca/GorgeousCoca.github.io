export function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function slugToTitle(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const [repositoryOwner = "", repositoryName = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  const isUserPagesRepo =
    repositoryOwner && repositoryName && repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
  const inferredBasePath = repositoryName && !isUserPagesRepo ? `/${repositoryName}` : "";
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const withBasePath =
    configuredBasePath && !normalizedPath.startsWith(configuredBasePath)
      ? `${configuredBasePath}${normalizedPath}`
      : normalizedPath;

  return new URL(withBasePath, base).toString();
}

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function excerptText(text: string, maxLength = 160) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}...`;
}
