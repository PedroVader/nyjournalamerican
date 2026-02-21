import Link from "next/link";
import Image from "next/image";
import { ArticleMetadata } from "./ArticleMetadata";
import { SponsoredBadge } from "./SponsoredBadge";

interface ArticleCardMediumProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string };
  author: { name: string; slug: string };
  publishedAt: string | null;
  isSponsored?: boolean;
}

export function ArticleCardMedium({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
  isSponsored,
}: ArticleCardMediumProps) {
  return (
    <article className="group">
      <Link href={`/${category.slug}/${slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-3">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          ) : (
            <Image
              src="/logo-nyjournalamerican.jpeg"
              alt={title}
              fill
              className="object-contain bg-gray-100 p-6"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          )}
          {isSponsored && (
            <div className="absolute top-2 left-2">
              <SponsoredBadge />
            </div>
          )}
        </div>
      </Link>
      <ArticleMetadata category={category} publishedAt={publishedAt} compact />
      <Link href={`/${category.slug}/${slug}`}>
        <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-dark-text group-hover:text-red-accent transition-colors mt-1 line-clamp-2 leading-snug">
          {title}
        </h3>
      </Link>
      {excerpt && (
        <p className="text-sm text-medium-gray mt-1 line-clamp-2">{excerpt}</p>
      )}
    </article>
  );
}
