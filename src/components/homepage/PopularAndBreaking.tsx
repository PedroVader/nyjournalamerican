import Link from "next/link";

interface PopularArticle {
  title: string;
  slug: string;
  categorySlug: string;
}

interface PopularAndBreakingProps {
  popular: PopularArticle[];
  breaking: PopularArticle[];
}

export function PopularAndBreaking({ popular, breaking }: PopularAndBreakingProps) {
  return (
    <div className="space-y-6">
      {breaking.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-headline)] text-base font-bold text-dark-text border-b-2 border-red-accent pb-2 mb-3">
            Breaking
          </h3>
          <ul className="space-y-2">
            {breaking.map((article, i) => (
              <li key={article.slug}>
                <Link
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="flex gap-2 group"
                >
                  <span className="text-red-accent font-bold text-sm">{i + 1}.</span>
                  <span className="text-sm text-dark-text group-hover:text-red-accent transition-colors line-clamp-2">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {popular.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-headline)] text-base font-bold text-dark-text border-b-2 border-navy pb-2 mb-3">
            Most Read
          </h3>
          <ul className="space-y-2">
            {popular.map((article, i) => (
              <li key={article.slug}>
                <Link
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="flex gap-2 group"
                >
                  <span className="text-navy font-bold text-sm">{i + 1}.</span>
                  <span className="text-sm text-dark-text group-hover:text-navy transition-colors line-clamp-2">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
