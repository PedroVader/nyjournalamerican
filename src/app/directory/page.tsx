import { prisma } from "@/lib/prisma/client";
import { ListingCard } from "@/components/directory/ListingCard";
import { FeaturedBusinesses } from "@/components/directory/FeaturedBusinesses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Directory | New York Journal American",
  description: "Explore our business directory. Get your business listed on a premium news domain.",
};

export const dynamic = "force-dynamic";

export default async function DirectoryPage() {
  const [featured, listings] = await Promise.all([
    prisma.businessListing.findMany({
      where: { isFeatured: true, status: "active" },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.businessListing.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold text-dark-text">
            Business Directory
          </h1>
          <p className="text-medium-gray mt-2">
            Discover businesses and services listed in the New York Journal American directory.
          </p>
        </div>
        <a
          href="/advertise#contact-form"
          className="hidden md:inline-block bg-red-accent hover:bg-red-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          List Your Business
        </a>
      </div>

      <FeaturedBusinesses businesses={featured} />

      <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-dark-text border-b-2 border-navy pb-2 mb-4 mt-8">
        All Listings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map((biz) => (
          <ListingCard key={biz.slug} {...biz} />
        ))}
      </div>

      {listings.length === 0 && (
        <p className="text-medium-gray text-center py-12">
          No listings yet. Be the first to list your business!
        </p>
      )}
    </div>
  );
}
