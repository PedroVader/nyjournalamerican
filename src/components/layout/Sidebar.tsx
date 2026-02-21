import Link from "next/link";

interface SidebarArticle {
  title: string;
  slug: string;
  categorySlug: string;
  publishedAt: string | null;
}

interface SidebarProps {
  popularArticles?: SidebarArticle[];
  breakingArticles?: SidebarArticle[];
}

export function Sidebar({ popularArticles = [], breakingArticles = [] }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {breakingArticles.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-dark-text border-b-2 border-red-accent pb-2 mb-4">
            Breaking News
          </h3>
          <ul className="space-y-3">
            {breakingArticles.map((article, i) => (
              <li key={article.slug}>
                <Link
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="flex gap-3 group"
                >
                  <span className="text-red-accent font-bold text-lg">{i + 1}</span>
                  <span className="text-sm text-dark-text group-hover:text-red-accent transition-colors line-clamp-2">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {popularArticles.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-dark-text border-b-2 border-navy pb-2 mb-4">
            Most Popular
          </h3>
          <ul className="space-y-3">
            {popularArticles.map((article, i) => (
              <li key={article.slug}>
                <Link
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="flex gap-3 group"
                >
                  <span className="text-navy font-bold text-lg">{i + 1}</span>
                  <span className="text-sm text-dark-text group-hover:text-navy transition-colors line-clamp-2">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Newsletter CTA in sidebar */}
      <div className="bg-navy-dark rounded-lg p-6 text-white">
        <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold mb-2">
          Stay Informed
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          Get the latest news delivered to your inbox every morning.
        </p>
        <form className="space-y-2">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-3 py-2 rounded text-sm text-dark-text bg-white"
          />
          <button className="w-full bg-red-accent hover:bg-red-hover text-white text-sm font-semibold py-2 rounded transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
