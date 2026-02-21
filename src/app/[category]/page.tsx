import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleCardMedium } from "@/components/articles/ArticleCardMedium";
import { Sidebar } from "@/components/layout/Sidebar";
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 300;

const ARTICLES_PER_PAGE = 24;

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};
  return genMeta({
    title: category.name,
    description: category.description || `Latest ${category.name} news and analysis.`,
    url: `https://newyorkjournalamerican.com/${slug}`,
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const skip = (currentPage - 1) * ARTICLES_PER_PAGE;

  const [articles, totalCount, popular] = await Promise.all([
    prisma.article.findMany({
      where: { categoryId: category.id, status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: ARTICLES_PER_PAGE,
      skip,
      include: { category: true, author: true },
    }),
    prisma.article.count({
      where: { categoryId: category.id, status: "PUBLISHED" },
    }),
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { views: "desc" },
      take: 5,
      include: { category: true },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-b-2 border-navy pb-3 mb-8">
        <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold text-dark-text">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-medium-gray mt-2">{category.description}</p>
        )}
        <p className="text-sm text-medium-gray mt-1">
          {totalCount} article{totalCount !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                isSponsored={a.isSponsored}
              />
            ))}
          </div>

          {articles.length === 0 && (
            <p className="text-medium-gray text-center py-12">
              No articles in this category yet. Check back soon!
            </p>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/${slug}?page=${currentPage - 1}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-dark-text hover:bg-gray-50 transition-colors"
                >
                  Previous
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 2
                )
                .map((p, i, arr) => {
                  const prev = arr[i - 1];
                  const showEllipsis = prev !== undefined && p - prev > 1;
                  return (
                    <span key={p} className="flex items-center gap-2">
                      {showEllipsis && (
                        <span className="text-medium-gray px-1">...</span>
                      )}
                      <Link
                        href={`/${slug}?page=${p}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          p === currentPage
                            ? "bg-navy text-white"
                            : "border border-gray-300 text-dark-text hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </Link>
                    </span>
                  );
                })}

              {currentPage < totalPages && (
                <Link
                  href={`/${slug}?page=${currentPage + 1}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-dark-text hover:bg-gray-50 transition-colors"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="lg:col-span-4">
          <Sidebar
            popularArticles={popular.map((a) => ({
              title: a.title,
              slug: a.slug,
              categorySlug: a.category.slug,
              publishedAt: a.publishedAt?.toISOString() || null,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
