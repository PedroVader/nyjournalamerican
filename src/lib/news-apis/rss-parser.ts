import Parser from "rss-parser";
import { mapToCategory } from "./category-mapper";

type CustomFeed = Record<string, unknown>;
type CustomItem = {
  title?: string;
  link?: string;
  contentSnippet?: string;
  content?: string;
  pubDate?: string;
  enclosure?: { url?: string };
  "content:encoded"?: string;
  "media:content"?: { $?: { url?: string } };
  "media:thumbnail"?: { $?: { url?: string } };
  "media:group"?: {
    "media:content"?: Array<{ $?: { url?: string } }>;
  };
};

const parser = new Parser<CustomFeed, CustomItem>({
  timeout: 10000,
  headers: {
    "User-Agent": "NewYorkJournalAmerican/1.0",
  },
  customFields: {
    item: [
      ["media:content", "media:content"],
      ["media:thumbnail", "media:thumbnail"],
      ["media:group", "media:group"],
      ["content:encoded", "content:encoded"],
    ],
  },
});

const RSS_FEEDS: Record<string, string> = {
  ap_news: "https://rsshub.app/apnews/topics/apf-topnews",
  reuters: "https://rsshub.app/reuters/world",
  nyt_us: "https://rss.nytimes.com/services/xml/rss/nyt/US.xml",
  nyt_politics: "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
  nyt_business: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  nyt_tech: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  bbc_us: "http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml",
  fox_latest: "https://moxie.foxnews.com/google-publisher/latest.xml",
  cnn_top: "http://rss.cnn.com/rss/cnn_topstories.rss",
  wsj_world: "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
  cnbc_top:
    "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114",
  techcrunch: "https://techcrunch.com/feed/",
  verge: "https://www.theverge.com/rss/index.xml",
  ars: "https://feeds.arstechnica.com/arstechnica/index",
  espn: "https://www.espn.com/espn/rss/news",
  nasa: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
};

function extractImageFromHtml(html: string | undefined | null): string | null {
  if (!html) return null;
  // Match <img src="..."> tags
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1]) return imgMatch[1];
  // Match <figure> or background-image styles
  const bgMatch = html.match(/url\(["']?([^"')]+)["']?\)/i);
  if (bgMatch?.[1]) return bgMatch[1];
  return null;
}

function extractImage(item: CustomItem): string | null {
  // 1. enclosure (podcasts, some news feeds)
  if (item.enclosure?.url) return item.enclosure.url;

  // 2. media:content (Reuters, NYT, many feeds)
  const mc = item["media:content"] as any;
  if (mc?.$?.url) return mc.$.url;
  if (typeof mc === "string") return null;
  // Sometimes media:content is an array
  if (Array.isArray(mc) && mc[0]?.$?.url) return mc[0].$.url;

  // 3. media:thumbnail
  const mt = item["media:thumbnail"] as any;
  if (mt?.$?.url) return mt.$.url;
  if (Array.isArray(mt) && mt[0]?.$?.url) return mt[0].$.url;

  // 4. media:group > media:content
  const mg = item["media:group"] as any;
  if (mg?.["media:content"]) {
    const groupContent = mg["media:content"];
    if (Array.isArray(groupContent) && groupContent[0]?.$?.url)
      return groupContent[0].$.url;
    if (groupContent?.$?.url) return groupContent.$.url;
  }

  // 5. Extract from content:encoded HTML
  const encoded = item["content:encoded"];
  if (typeof encoded === "string") {
    const img = extractImageFromHtml(encoded);
    if (img) return img;
  }

  // 6. Extract from content HTML
  if (typeof item.content === "string") {
    const img = extractImageFromHtml(item.content);
    if (img) return img;
  }

  return null;
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

export async function fetchFromRSS(): Promise<AggregatedArticle[]> {
  const articles: AggregatedArticle[] = [];

  const feedPromises = Object.entries(RSS_FEEDS).map(
    async ([sourceKey, feedUrl]) => {
      try {
        const feed = await parser.parseURL(feedUrl);
        const items = (feed.items || []).slice(0, 15);

        for (const item of items) {
          if (!item.title || !item.link) continue;

          const image = extractImage(item);

          articles.push({
            title: item.title,
            description:
              item.contentSnippet?.slice(0, 500) ||
              item.content?.replace(/<[^>]+>/g, "").slice(0, 500) ||
              null,
            url: item.link,
            image,
            publishedAt: item.pubDate || new Date().toISOString(),
            source: feed.title || sourceKey,
            provider: "rss",
            mappedCategory: mapToCategory(sourceKey),
          });
        }
      } catch {
        // Feed failed, skip silently
      }
    }
  );

  await Promise.allSettled(feedPromises);
  return articles;
}
