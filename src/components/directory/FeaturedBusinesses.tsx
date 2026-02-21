import { ListingCard } from "./ListingCard";

interface Business {
  businessName: string;
  slug: string;
  shortDescription: string | null;
  logo: string | null;
  website: string;
  city: string | null;
  state: string | null;
  categorySlug: string;
  plan: string;
  isFeatured: boolean;
  linkType: string;
}

interface FeaturedBusinessesProps {
  businesses: Business[];
}

export function FeaturedBusinesses({ businesses }: FeaturedBusinessesProps) {
  if (!businesses.length) return null;

  return (
    <section className="mb-8">
      <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-dark-text border-b-2 border-gold pb-2 mb-4">
        Featured Businesses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {businesses.map((biz) => (
          <ListingCard key={biz.slug} {...biz} />
        ))}
      </div>
    </section>
  );
}
