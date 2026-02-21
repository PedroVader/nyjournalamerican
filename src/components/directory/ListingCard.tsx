import Link from "next/link";
import Image from "next/image";

interface ListingCardProps {
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

export function ListingCard({
  businessName,
  slug,
  shortDescription,
  logo,
  website,
  city,
  state,
  plan,
  isFeatured,
}: ListingCardProps) {
  return (
    <div
      className={`border rounded-lg p-5 transition-shadow hover:shadow-md ${
        isFeatured ? "border-gold bg-amber-50/30 ring-1 ring-gold/20" : "border-gray-200"
      }`}
    >
      <div className="flex items-start gap-4">
        {logo && (
          <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden border border-gray-100">
            <Image src={logo} alt={businessName} fill className="object-contain" sizes="64px" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link href={`/directory/${slug}`}>
              <h3 className="font-semibold text-dark-text hover:text-red-accent transition-colors">
                {businessName}
              </h3>
            </Link>
            {isFeatured && (
              <span className="bg-gold text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                Featured
              </span>
            )}
            {plan === "premium" && (
              <span className="bg-navy text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                Premium
              </span>
            )}
          </div>
          {(city || state) && (
            <p className="text-xs text-medium-gray mt-0.5">
              {[city, state].filter(Boolean).join(", ")}
            </p>
          )}
          {shortDescription && (
            <p className="text-sm text-medium-gray mt-2 line-clamp-2">{shortDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
}
