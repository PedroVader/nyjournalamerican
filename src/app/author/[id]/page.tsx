import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import { ArticleCardMedium } from "@/components/articles/ArticleCardMedium";
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = await prisma.author.findUnique({ where: { slug: id } });
  if (!author) return {};
  return genMeta({ title: author.name, description: author.bio || `Articles by ${author.name}` });
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;
  const author = await prisma.author.findUnique({ where: { slug: id } });
  if (!author) notFound();

  const articles = await prisma.article.findMany({
    where: { authorId: author.id, status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 20,
    include: { category: true, author: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text">
          {author.name}
        </h1>
        <p className="text-sm text-medium-gray mt-1 uppercase">{author.role}</p>
        {author.bio && <p className="text-medium-gray mt-3 max-w-2xl">{author.bio}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
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
