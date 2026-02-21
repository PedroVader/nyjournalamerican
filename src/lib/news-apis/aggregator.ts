import { fetchFromNewsAPI } from "./newsapi";
import { fetchFromGNews } from "./gnews";
import { fetchFromRSS } from "./rss-parser";

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

export async function aggregateNews(): Promise<AggregatedArticle[]> {
  const [newsApiArticles, gnewsArticles, rssArticles] =
    await Promise.allSettled([
      fetchFromNewsAPI(),
      fetchFromGNews(),
      fetchFromRSS(),
    ]);

  const all: AggregatedArticle[] = [
    ...(newsApiArticles.status === "fulfilled" ? newsApiArticles.value : []),
    ...(gnewsArticles.status === "fulfilled" ? gnewsArticles.value : []),
    ...(rssArticles.status === "fulfilled" ? rssArticles.value : []),
  ];

  // Deduplicate by URL
  const seen = new Set<string>();
  const unique: AggregatedArticle[] = [];

  for (const article of all) {
    if (seen.has(article.url)) continue;
    seen.add(article.url);
    unique.push(article);
  }

  return unique;
}
