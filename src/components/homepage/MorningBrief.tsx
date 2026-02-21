import { ArticleCardSmall } from "@/components/articles/ArticleCardSmall";

interface BriefArticle {
  title: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  publishedAt: string | null;
}

interface MorningBriefProps {
  articles: BriefArticle[];
}

export function MorningBrief({ articles }: MorningBriefProps) {
  if (!articles.length) return null;

  return (
    <div>
      <div className="border-b-2 border-navy pb-2 mb-4">
        <h2 className="font-[family-name:var(--font-headline)] text-lg font-bold text-dark-text">
          Morning Brief
        </h2>
      </div>
      <div>
        {articles.map((article) => (
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
  );
}
