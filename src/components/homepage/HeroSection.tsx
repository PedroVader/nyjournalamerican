import { ArticleCardLarge } from "@/components/articles/ArticleCardLarge";
import { ArticleCardMedium } from "@/components/articles/ArticleCardMedium";
import { ArticleCardSmall } from "@/components/articles/ArticleCardSmall";

interface HeroArticle {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string };
  author: { name: string; slug: string };
  publishedAt: string | null;
  readingTime: number | null;
  isSponsored?: boolean;
}

interface HeroSectionProps {
  mainArticle: HeroArticle | null;
  secondaryArticles: HeroArticle[];
  sidebarArticles: { title: string; slug: string; categorySlug: string; categoryName: string; publishedAt: string | null }[];
}

export function HeroSection({
  mainArticle,
  secondaryArticles,
  sidebarArticles,
}: HeroSectionProps) {
  if (!mainArticle) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - Morning Brief */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="border-b-2 border-navy pb-2 mb-4">
            <h2 className="font-[family-name:var(--font-headline)] text-lg font-bold text-dark-text">
              Morning Brief
            </h2>
          </div>
          <div>
            {sidebarArticles.slice(0, 8).map((article) => (
              <ArticleCardSmall
                key={article.slug}
                title={article.title}
                slug={article.slug}
                categorySlug={article.categorySlug}
                categoryName={article.categoryName}
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        </div>

        {/* Main hero article */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <ArticleCardLarge {...mainArticle} />
        </div>

        {/* Right column - Secondary articles */}
        <div className="lg:col-span-3 order-3 space-y-6">
          {secondaryArticles.slice(0, 2).map((article) => (
            <ArticleCardMedium key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
