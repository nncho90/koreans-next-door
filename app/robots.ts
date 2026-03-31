import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Traditional search engines
      { userAgent: "Googlebot", allow: "/", disallow: ["/feedback", "/api/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/feedback", "/api/"] },
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      // Anthropic (Claude)
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      // Google AI (Gemini / AI Overviews)
      { userAgent: "Google-Extended", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // Others
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      // Default: allow all, block private pages
      { userAgent: "*", allow: "/", disallow: ["/feedback", "/api/"] },
    ],
    sitemap: "https://koreansnextdoor.com/sitemap.xml",
  };
}
