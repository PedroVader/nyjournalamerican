import Link from "next/link";
import { ArticleCardMedium } from "@/components/articles/ArticleCardMedium";
import { ArticleCardHorizontal } from "@/components/articles/ArticleCardHorizontal";

interface CategoryArticle {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string };
  author: { name: string; slug: string };
  publishedAt: string | null;
}

interface CategorySectionProps {
  categoryName: string;
  categorySlug: string;
  articles: CategoryArticle[];
  layout?: "grid" | "featured";
}

export function CategorySection({
  categoryName,
  categorySlug,
  articles,
  layout = "grid",
}: CategorySectionProps) {
  if (!articles.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between border-b-2 border-navy pb-2 mb-6">
        <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text">
          {categoryName}
        </h2>
        <Link
          href={`/${categorySlug}`}
          className="text-sm font-medium text-red-accent hover:text-red-hover transition-colors"
        >
          View All
        </Link>
      </div>

      {layout === "featured" && articles.length >= 3 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <ArticleCardMedium {...articles[0]} />
          </div>
          <div className="lg:col-span-6 space-y-4">
            {articles.slice(1, 4).map((article) => (
              <ArticleCardHorizontal key={article.slug} {...article} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article) => (
            <ArticleCardMedium key={article.slug} {...article} />
          ))}
        </div>
      )}
    </section>
  );
}
