import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const biz = await prisma.businessListing.findUnique({ where: { slug } });
  if (!biz) return {};
  return {
    title: `${biz.businessName} | Business Directory | New York Journal American`,
    description: biz.shortDescription || biz.description.slice(0, 160),
  };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const biz = await prisma.businessListing.findUnique({ where: { slug } });
  if (!biz || biz.status !== "active") notFound();

  // Track impression
  prisma.businessListing.update({
    where: { id: biz.id },
    data: { impressions: { increment: 1 } },
  }).catch(() => {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-start gap-6 mb-8">
        {biz.logo && (
          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-200">
            <Image src={biz.logo} alt={biz.businessName} fill className="object-contain" sizes="96px" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text">
              {biz.businessName}
            </h1>
            {biz.isFeatured && (
              <span className="bg-gold text-white text-xs font-bold uppercase px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>
          {(biz.city || biz.state) && (
            <p className="text-medium-gray mt-1">
              {[biz.city, biz.state, biz.country].filter(Boolean).join(", ")}
            </p>
          )}
          <a
            href={biz.website}
            target="_blank"
            rel={biz.linkType === "dofollow" ? "noopener" : "noopener noreferrer nofollow"}
            className="inline-block mt-3 bg-navy hover:bg-navy-dark text-white font-medium px-4 py-2 rounded transition-colors text-sm"
          >
            Visit Website
          </a>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-dark-text">
        <p>{biz.description}</p>
      </div>

      {(biz.phone || biz.email) && (
        <div className="mt-8 p-6 bg-off-white rounded-lg">
          <h2 className="font-semibold text-dark-text mb-3">Contact Information</h2>
          {biz.phone && <p className="text-sm text-medium-gray">Phone: {biz.phone}</p>}
          {biz.email && <p className="text-sm text-medium-gray">Email: {biz.email}</p>}
        </div>
      )}
    </div>
  );
}
