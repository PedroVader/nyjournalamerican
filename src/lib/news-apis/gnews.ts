import { mapToCategory } from "./category-mapper";

interface GNewsArticle {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
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

export async function fetchFromGNews(): Promise<AggregatedArticle[]> {
  const key = process.env.GNEWS_KEY;
  if (!key) return [];

  const categories = ["business", "technology", "sports", "entertainment", "health", "science", "general"];
  const articles: AggregatedArticle[] = [];

  for (const category of categories) {
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${key}`,
        { next: { revalidate: 0 } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const items = (data.articles || []) as GNewsArticle[];

      for (const item of items) {
        if (!item.title) continue;
        articles.push({
          title: item.title,
          description: item.description,
          url: item.url,
          image: item.image,
          publishedAt: item.publishedAt,
          source: item.source?.name || "GNews",
          provider: "gnews",
          mappedCategory: mapToCategory("", category),
        });
      }
    } catch {
      continue;
    }
  }

  return articles;
}
