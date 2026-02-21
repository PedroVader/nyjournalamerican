import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import { ArticleCardMedium } from "@/components/articles/ArticleCardMedium";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tagData = await prisma.tag.findUnique({ where: { slug: tag } });
  if (!tagData) return {};
  return { title: `${tagData.name} | New York Journal American` };
}

export default async function TopicPage({ params }: Props) {
  const { tag } = await params;
  const tagData = await prisma.tag.findUnique({
    where: { slug: tag },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 20,
        include: { category: true, author: true },
      },
    },
  });

  if (!tagData) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-b-2 border-navy pb-3 mb-8">
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text">
          Topic: {tagData.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tagData.articles.map((a) => (
          <ArticleCardMedium
            key={a.slug}
            title={a.title}
            slug={a.slug}
            excerpt={a.excerpt}
            featuredImage={a.featuredImage}
            category={{ name: a.category.name, slug: a.category.slug }}
            author={{ name: a.author.name, slug: a.author.slug }}
            publishedAt={a.publishedAt?.toISOString() || null}
          />
        ))}
      </div>
    </div>
  );
}
