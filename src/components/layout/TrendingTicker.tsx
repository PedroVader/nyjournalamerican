import Link from "next/link";

interface TrendingItem {
  title: string;
  slug: string;
  categorySlug: string;
}

interface TrendingTickerProps {
  items: TrendingItem[];
}

export function TrendingTicker({ items }: TrendingTickerProps) {
  if (!items.length) return null;

  return (
    <div className="bg-red-accent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <span className="bg-navy-dark text-white text-xs font-extrabold uppercase tracking-wider px-4 py-3 mr-4 whitespace-nowrap shrink-0 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          Breaking
        </span>
        <div className="overflow-hidden py-2.5">
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/${item.categorySlug}/${item.slug}`}
                className="text-sm font-semibold text-white hover:text-gold transition-colors flex items-center gap-3"
              >
                <span className="text-gold/70">&#9679;</span>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
