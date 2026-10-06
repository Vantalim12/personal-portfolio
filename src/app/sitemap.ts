import { siteUrl } from "@/lib/metadata";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/projects", "/contact", "/privacy"].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
