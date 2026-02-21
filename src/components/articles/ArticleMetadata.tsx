import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

interface ArticleMetadataProps {
  author?: { name: string; slug: string } | null;
  category?: { name: string; slug: string } | null;
  publishedAt?: string | null;
  readingTime?: number | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
  compact?: boolean;
}

export function ArticleMetadata({
  author,
  category,
  publishedAt,
  readingTime,
  sourceName,
  sourceUrl,
  compact = false,
}: ArticleMetadataProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-medium-gray ${compact ? "text-xs" : "text-sm"}`}>
      {category && (
        <Link
          href={`/${category.slug}`}
          className="font-semibold text-red-accent hover:text-red-hover uppercase tracking-wide"
        >
          {category.name}
        </Link>
      )}
      {author && (
        <span>
          By{" "}
          <Link href={`/author/${author.slug}`} className="text-dark-text hover:text-red-accent font-medium">
            {author.name}
          </Link>
        </span>
      )}
      {publishedAt && <span>{formatRelativeTime(publishedAt)}</span>}
      {readingTime && <span>{readingTime} min read</span>}
      {sourceName && (
        <span>
          Source:{" "}
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-dark-text">
              {sourceName}
            </a>
          ) : (
            sourceName
          )}
        </span>
      )}
    </div>
  );
}
