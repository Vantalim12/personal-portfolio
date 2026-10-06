import type { Metadata } from "next";

export const siteUrl = "https://jaspergumora.is-pinoy.dev";
export const siteDescription =
  "Jasper Gumora is a full-stack developer who builds web applications and self-hosts n8n workflow automations.";

export function getPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Jasper Gumora",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      creator: "@Peirogi25",
    },
  };
}
