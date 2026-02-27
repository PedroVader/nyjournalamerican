export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getAuthorForCategory } from "@/lib/authors";
import { sanitizeText } from "@/lib/news-apis/content-scraper";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    authorsReassigned: 0,
    titlesFixed: 0,
    articlesDeleted: 0,
    oldAuthorsRemoved: [] as string[],
  };

  // 1. Fix HTML entities in existing titles and excerpts
  const allArticles = await prisma.article.findMany({
    select: { id: true, title: true, excerpt: true, categoryId: true },
  });

  for (const article of allArticles) {
    const cleanTitle = sanitizeText(article.title);
    const cleanExcerpt = article.excerpt ? sanitizeText(article.excerpt) : null;

    if (cleanTitle !== article.title || (cleanExcerpt && cleanExcerpt !== article.excerpt)) {
      await prisma.article.update({
        where: { id: article.id },
        data: {
          title: cleanTitle,
          ...(cleanExcerpt && cleanExcerpt !== article.excerpt ? { excerpt: cleanExcerpt } : {}),
        },
      });
      results.titlesFixed++;
    }
  }

  // 2. Reassign articles from non-standard authors (like "Wise Services")
  //    to the proper fictional author set
  const validSlugs = new Set([
    "james-crawford", "sarah-mitchell",
    "michael-brennan", "victoria-hayes",
    "alexander-webb", "natasha-petrov",
    "robert-kingsley", "catherine-chen",
    "david-park", "lauren-schafer",
    "marcus-thompson", "jennifer-reeves",
    "christopher-blake", "amanda-sterling",
    "thomas-wright", "elena-vasquez",
    "jonathan-miller", "priya-kapoor",
  ]);

  const allAuthors = await prisma.author.findMany({
    include: { articles: { select: { id: true, title: true, categoryId: true } } },
  });

  const categories = await prisma.category.findMany();
  const categorySlugMap = new Map(categories.map((c) => [c.id, c.slug]));

  for (const author of allAuthors) {
    if (validSlugs.has(author.slug)) continue;

    // This author is not in our valid set — reassign their articles
    for (const article of author.articles) {
      const catSlug = categorySlugMap.get(article.categoryId) || "us";
      const newAuthorId = await getAuthorForCategory(catSlug, article.title);
      await prisma.article.update({
        where: { id: article.id },
        data: { authorId: newAuthorId },
      });
      results.authorsReassigned++;
    }

    // Delete the old author once all articles are reassigned
    await prisma.author.delete({ where: { id: author.id } });
    results.oldAuthorsRemoved.push(author.name);
  }

  // 3. Delete articles with insufficient content (< 150 words)
  const articlesWithContent = await prisma.article.findMany({
    select: { id: true, content: true },
  });

  for (const article of articlesWithContent) {
    const content = article.content as any;
    if (!content?.content || !Array.isArray(content.content)) {
      await prisma.article.delete({ where: { id: article.id } });
      results.articlesDeleted++;
      continue;
    }

    const blocks = content.content as any[];
    const wordCount = blocks
      .filter((b: any) => b.content?.length)
      .map((b: any) => b.content.map((c: any) => c.text || "").join(" "))
      .join(" ")
      .split(/\s+/)
      .filter((w: string) => w.length > 0).length;

    if (wordCount < 150 || blocks.length < 3) {
      await prisma.article.delete({ where: { id: article.id } });
      results.articlesDeleted++;
    }
  }

  return NextResponse.json({ success: true, ...results });
}
