interface NewsApiArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

interface AggregatedArticle {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
  provider: string;
  mappedCategory: string;
}

import { mapToCategory } from "./category-mapper";

export async function fetchFromNewsAPI(): Promise<AggregatedArticle[]> {
  const key = process.env.NEWSAPI_KEY;
  if (!key) return [];

  const categories = ["business", "technology", "sports", "entertainment", "health", "science", "general"];
  const articles: AggregatedArticle[] = [];

  for (const category of categories) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=10&apiKey=${key}`,
        { next: { revalidate: 0 } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const items = (data.articles || []) as NewsApiArticle[];

      for (const item of items) {
        if (!item.title || item.title === "[Removed]") continue;
        articles.push({
          title: item.title,
          description: item.description,
          url: item.url,
          image: item.urlToImage,
          publishedAt: item.publishedAt,
          source: item.source?.name || "NewsAPI",
          provider: "newsapi",
          mappedCategory: mapToCategory("", category),
        });
      }
    } catch {
      continue;
    }
  }

  return articles;
}
