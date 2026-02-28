import Link from "next/link";
import Image from "next/image";

interface FeaturedBannerProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  categorySlug: string;
  sponsorName?: string | null;
}

export function FeaturedBanner({
  title,
  slug,
  excerpt,
  featuredImage,
  categorySlug,
  sponsorName,
}: FeaturedBannerProps) {
  return (
    <section className="bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {sponsorName && (
              <span className="inline-block bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
                Featured
              </span>
            )}
            <Link href={`/${categorySlug}/${slug}`}>
              <h2 className="font-[family-name:var(--font-headline)] text-white text-2xl md:text-4xl font-bold leading-tight hover:text-gold transition-colors">
                {title}
              </h2>
            </Link>
            {excerpt && (
              <p className="text-gray-300 mt-4 text-lg leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            )}
            <Link
              href={`/${categorySlug}/${slug}`}
              className="inline-block mt-6 bg-red-accent hover:bg-red-hover text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              Read Full Story
            </Link>
          </div>
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
            <Image
              src={featuredImage || "/background.png"}
              alt={title}
              fill
              className={
                featuredImage ? "object-cover" : "object-contain bg-navy p-8"
              }
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
