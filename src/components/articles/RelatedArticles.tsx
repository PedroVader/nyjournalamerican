import { ArticleCardMedium } from "./ArticleCardMedium";

interface RelatedArticle {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string };
  author: { name: string; slug: string };
  publishedAt: string | null;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text mb-6">
        Related Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCardMedium key={article.slug} {...article} />
        ))}
      </div>
    </section>
  );
}
