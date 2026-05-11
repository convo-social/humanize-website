import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humanize.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/study-privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/security`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
