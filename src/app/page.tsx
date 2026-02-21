import { prisma } from "@/lib/prisma/client";
import { TrendingTicker } from "@/components/layout/TrendingTicker";
import { HeroSection } from "@/components/homepage/HeroSection";
import { CategorySection } from "@/components/homepage/CategorySection";
import { FeaturedBanner } from "@/components/homepage/FeaturedBanner";
import { NewsletterCTA } from "@/components/homepage/NewsletterCTA";
import { generateOrganizationJsonLd } from "@/lib/seo";

export const revalidate = 300;

async function getHomepageData() {
  const [latestArticles, categories, popularArticles] = await Promise.all([
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 60,
      include: { category: true, author: true },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { views: "desc" },
      take: 10,
      include: { category: true },
    }),
  ]);

  return { latestArticles, categories, popularArticles };
}

export default async function HomePage() {
  const { latestArticles, categories, popularArticles } = await getHomepageData();

  const mapArticle = (a: (typeof latestArticles)[0]) => ({
    ...a,
    category: { name: a.category.name, slug: a.category.slug },
    author: { name: a.author.name, slug: a.author.slug },
    publishedAt: a.publishedAt?.toISOString() || null,
  });

  const mainArticle = latestArticles[0] ? mapArticle(latestArticles[0]) : null;
  const secondaryArticles = latestArticles.slice(1, 3).map(mapArticle);
  const sidebarArticles = latestArticles.slice(3, 11).map((a) => ({
    title: a.title,
    slug: a.slug,
    categorySlug: a.category.slug,
    categoryName: a.category.name,
    publishedAt: a.publishedAt?.toISOString() || null,
  }));

  const trendingItems = popularArticles.slice(0, 6).map((a) => ({
    title: a.title,
    slug: a.slug,
    categorySlug: a.category.slug,
  }));

  const featuredArticle = latestArticles.find((a) => a.isFeaturedPaid) || latestArticles[11];

  const articlesByCategory: Record<string, typeof latestArticles> = {};
  for (const article of latestArticles) {
    const slug = article.category.slug;
    if (!articlesByCategory[slug]) articlesByCategory[slug] = [];
    articlesByCategory[slug].push(article);
  }

  const categorySections = ["business", "technology", "sports", "entertainment", "science"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationJsonLd()) }}
      />

      <TrendingTicker items={trendingItems} />

      <HeroSection
        mainArticle={mainArticle}
        secondaryArticles={secondaryArticles}
        sidebarArticles={sidebarArticles}
      />

      {featuredArticle && (
        <FeaturedBanner
          title={featuredArticle.title}
          slug={featuredArticle.slug}
          excerpt={featuredArticle.excerpt}
          featuredImage={featuredArticle.featuredImage}
          categorySlug={featuredArticle.category.slug}
          sponsorName={featuredArticle.sponsorName}
        />
      )}

      {categorySections.map((catSlug, i) => {
        const cat = categories.find((c) => c.slug === catSlug);
        const articles = (articlesByCategory[catSlug] || []).slice(0, 4).map(mapArticle);
        if (!articles.length) return null;
        return (
          <CategorySection
            key={catSlug}
            categoryName={cat?.name || catSlug}
            categorySlug={catSlug}
            articles={articles}
            layout={i % 2 === 0 ? "grid" : "featured"}
          />
        );
      })}

      <NewsletterCTA />
    </>
  );
}
