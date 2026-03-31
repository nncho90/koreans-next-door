import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://koreans-next-door.vercel.app";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/guide/settle`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/explore`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/pinch`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/health`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
