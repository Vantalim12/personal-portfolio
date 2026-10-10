import type { Metadata } from "next";

export const siteUrl = "https://jaspergumora.is-pinoy.dev";
export const siteDescription =
  "Jasper Gumora is an MSU-IIT graduate and full-stack developer and GoHighLevel (GHL) integrator at BKMElevations LLC, a New York, United States startup.";

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
