export function openExternalLink(
  url: string,
  target: string = "_blank",
  features: string = "noopener,noreferrer"
): void {
  if (typeof window !== "undefined") {
    window.open(url, target, features);
  }
}

