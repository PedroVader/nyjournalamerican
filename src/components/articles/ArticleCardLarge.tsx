import Link from "next/link";
import Image from "next/image";
import { ArticleMetadata } from "./ArticleMetadata";
import { SponsoredBadge } from "./SponsoredBadge";

interface ArticleCardLargeProps {
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

export function ArticleCardLarge({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
  readingTime,
  isSponsored,
}: ArticleCardLargeProps) {
  return (
    <article className="group">
      <Link href={`/${category.slug}/${slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          ) : (
            <Image
              src="/logo-nyjournalamerican.jpeg"
              alt={title}
              fill
              className="object-contain bg-gray-100 p-8"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          )}
          {isSponsored && (
            <div className="absolute top-3 left-3">
              <SponsoredBadge />
            </div>
          )}
        </div>
      </Link>
      <ArticleMetadata
        category={category}
        author={author}
        publishedAt={publishedAt}
        readingTime={readingTime}
      />
      <Link href={`/${category.slug}/${slug}`}>
        <h2 className="font-[family-name:var(--font-headline)] text-2xl md:text-3xl font-bold text-dark-text group-hover:text-red-accent transition-colors mt-2 leading-tight">
          {title}
        </h2>
      </Link>
      {excerpt && (
        <p className="text-medium-gray mt-2 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      )}
    </article>
  );
}
