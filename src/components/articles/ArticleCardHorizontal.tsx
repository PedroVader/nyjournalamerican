import Link from "next/link";
import Image from "next/image";
import { ArticleMetadata } from "./ArticleMetadata";

interface ArticleCardHorizontalProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string };
  author: { name: string; slug: string };
  publishedAt: string | null;
}

export function ArticleCardHorizontal({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
}: ArticleCardHorizontalProps) {
  return (
    <article className="group flex gap-4">
      <Link href={`/${category.slug}/${slug}`} className="shrink-0">
        <div className="relative w-32 h-24 md:w-48 md:h-32 overflow-hidden rounded-lg">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="200px"
            />
          ) : (
            <Image
              src="/background.png"
              alt={title}
              fill
              className="object-contain bg-gray-100 p-4"
              sizes="200px"
            />
          )}
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <ArticleMetadata
          category={category}
          publishedAt={publishedAt}
          compact
        />
        <Link href={`/${category.slug}/${slug}`}>
          <h3 className="font-[family-name:var(--font-headline)] text-base md:text-lg font-bold text-dark-text group-hover:text-red-accent transition-colors mt-1 line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>
        {excerpt && (
          <p className="text-sm text-medium-gray mt-1 line-clamp-2 hidden md:block">
            {excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
