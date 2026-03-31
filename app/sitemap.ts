import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://koreansnextdoor.com";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    // Guide hub
    { url: `${base}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Getting Started
    { url: `${base}/guide/settle`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/visa`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Living Here
    { url: `${base}/guide/housing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/money`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/daily`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Wellbeing
    { url: `${base}/guide/health`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/mental-health`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/pinch`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Discover
    { url: `${base}/guide/explore`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Tools
    { url: `${base}/tools/phrasebook`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/forms`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Standalone
    { url: `${base}/vegan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
