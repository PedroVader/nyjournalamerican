export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { aggregateNews } from "@/lib/news-apis/aggregator";
import { CATEGORY_DEFINITIONS } from "@/lib/news-apis/category-mapper";
import { fetchOgImage } from "@/lib/news-apis/og-image";
import { scrapeArticleContent } from "@/lib/news-apis/content-scraper";
import { getAuthorForCategory } from "@/lib/authors";
import { generateSlug } from "@/lib/utils";

async function getCategoryId(categorySlug: string): Promise<string> {
  let category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    const def = CATEGORY_DEFINITIONS[categorySlug];
    category = await prisma.category.create({
      data: {
        name: def?.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
        slug: categorySlug,
        description: def?.description || null,
        order: def?.order || 99,
      },
    });
  }

  return category.id;
}


async function pingIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || urls.length === 0) return;

  try {
    await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "newyorkjournalamerican.com",
        key,
        urlList: urls.slice(0, 10000),
      }),
    });
  } catch {
    // IndexNow ping failed silently
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await aggregateNews();
    let imported = 0;
    let skipped = 0;
    const newUrls: string[] = [];

    for (const article of articles) {
      const slug = generateSlug(article.title);

      // Skip if already exists
      const exists = await prisma.article.findFirst({
        where: {
          OR: [{ sourceUrl: article.url }, { slug }],
        },
      });

      if (exists) {
        skipped++;
        continue;
      }

      const categoryId = await getCategoryId(article.mappedCategory);
      const authorId = await getAuthorForCategory(article.mappedCategory, article.title);

      // If no image from RSS, or if BBC (low-res thumbnails), try fetching OG image
      let image = article.image;
      const isBbc = article.url?.includes(".bbc.co.uk") || article.url?.includes(".bbci.co.uk");
      if ((!image || isBbc) && article.url) {
        const ogImage = await fetchOgImage(article.url);
        if (ogImage) image = ogImage;
      }

      // Try to scrape full article content from the source URL
      let contentBlocks: any[] = [];
      let wordCount = 0;

      const scraped = await scrapeArticleContent(article.url);
      if (scraped && scraped.length > 0) {
        contentBlocks = scraped;
        wordCount = scraped
          .filter((b) => b.content?.length)
          .map((b) => b.content.map((c: any) => c.text).join(" "))
          .join(" ")
          .split(/\s+/).length;
      } else {
        // Fallback to RSS description
        contentBlocks = [
          {
            type: "paragraph",
            content: [{ type: "text", text: article.description || "" }],
          },
        ];
        wordCount = article.description?.split(/\s+/).length || 50;
      }

      await prisma.article.create({
        data: {
          title: article.title,
          slug,
          excerpt: article.description?.slice(0, 300) || "",
          content: {
            type: "doc",
            content: contentBlocks,
          },
          featuredImage: image || null,
          status: "PUBLISHED",
          priority: 0,
          readingTime: Math.max(1, Math.ceil(wordCount / 200)),
          sourceApi: article.provider,
          sourceUrl: article.url,
          sourceName: article.source,
          categoryId,
          authorId,
          publishedAt: article.publishedAt
            ? new Date(article.publishedAt)
            : new Date(),
        },
      });

      imported++;
      newUrls.push(
        `https://newyorkjournalamerican.com/${article.mappedCategory}/${slug}`
      );
    }

    // Ping IndexNow with new URLs
    if (newUrls.length > 0) {
      await pingIndexNow(newUrls);
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: articles.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron fetch-news error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
