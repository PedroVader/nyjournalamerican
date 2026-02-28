import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { ArticleMetadata } from "@/components/articles/ArticleMetadata";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { SponsoredBadge } from "@/components/articles/SponsoredBadge";
import { generateMetadata as genMeta, generateArticleJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 600;

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });
  if (!article) return {};
  return genMeta({
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt || undefined,
    image: article.ogImage || article.featuredImage || undefined,
    url: `https://newyorkjournalamerican.com/${article.category.slug}/${article.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true, author: true, tags: true },
  });

  if (!article || article.status !== "PUBLISHED") notFound();

  // Increment views
  prisma.article
    .update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    })
    .catch(() => {});

  const related = await prisma.article.findMany({
    where: {
      categoryId: article.categoryId,
      status: "PUBLISHED",
      id: { not: article.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true, author: true },
  });

  const url = `https://newyorkjournalamerican.com/${article.category.slug}/${article.slug}`;
  const jsonLd = generateArticleJsonLd({
    title: article.title,
    description: article.excerpt || "",
    image: article.featuredImage || undefined,
    url,
    publishedAt:
      article.publishedAt?.toISOString() || article.createdAt.toISOString(),
    author: article.author.name,
    category: article.category.name,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category + Sponsored badge */}
        <div className="flex items-center gap-3 mb-4">
          <a
            href={`/${article.category.slug}`}
            className="text-sm font-bold text-red-accent uppercase tracking-wide hover:text-red-hover"
          >
            {article.category.name}
          </a>
          {article.isSponsored && <SponsoredBadge />}
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-bold text-dark-text leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xl text-medium-gray mt-4 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <ArticleMetadata
            author={{ name: article.author.name, slug: article.author.slug }}
            category={{
              name: article.category.name,
              slug: article.category.slug,
            }}
            publishedAt={article.publishedAt?.toISOString() || null}
            readingTime={article.readingTime}
          />
        </div>

        {/* Share */}
        <div className="py-4 border-b border-gray-200">
          <ShareButtons url={url} title={article.title} />
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] mt-8 rounded-lg overflow-hidden">
          <Image
            src={article.featuredImage || "/background.png"}
            alt={article.imageCaption || article.title}
            fill
            className={
              article.featuredImage
                ? "object-cover"
                : "object-contain bg-gray-100 p-12"
            }
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          {article.imageCaption && (
            <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-4 py-2">
              {article.imageCaption}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="mt-8">
          <ArticleBody content={article.content} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <a
                key={tag.slug}
                href={`/topic/${tag.slug}`}
                className="bg-gray-100 text-sm text-medium-gray px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag.name}
              </a>
            ))}
          </div>
        )}

        {/* Related */}
        <RelatedArticles
          articles={related.map((r) => ({
            title: r.title,
            slug: r.slug,
            excerpt: r.excerpt,
            featuredImage: r.featuredImage,
            category: { name: r.category.name, slug: r.category.slug },
            author: { name: r.author.name, slug: r.author.slug },
            publishedAt: r.publishedAt?.toISOString() || null,
          }))}
        />
      </article>
    </>
  );
}
