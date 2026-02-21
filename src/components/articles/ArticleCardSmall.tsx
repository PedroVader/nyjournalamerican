import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

interface ArticleCardSmallProps {
  title: string;
  slug: string;
  categorySlug: string;
  categoryName?: string;
  publishedAt: string | null;
}

export function ArticleCardSmall({
  title,
  slug,
  categorySlug,
  categoryName,
  publishedAt,
}: ArticleCardSmallProps) {
  return (
    <article className="group py-3 border-b border-gray-100 last:border-0">
      <Link href={`/${categorySlug}/${slug}`}>
        <div className="flex items-start gap-2">
          {categoryName && (
            <span className="text-[10px] font-bold text-red-accent uppercase tracking-wide shrink-0 mt-0.5">
              {categoryName}
            </span>
          )}
          <h4 className="text-sm font-medium text-dark-text group-hover:text-red-accent transition-colors line-clamp-2 leading-snug">
            {title}
          </h4>
        </div>
        {publishedAt && (
          <span className="text-xs text-medium-gray mt-1 block">
            {formatRelativeTime(publishedAt)}
          </span>
        )}
      </Link>
    </article>
  );
}
