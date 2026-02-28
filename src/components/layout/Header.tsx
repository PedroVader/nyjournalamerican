import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./MobileNav";

const categories = [
  { name: "U.S.", slug: "us" },
  { name: "World", slug: "world" },
  { name: "Politics", slug: "politics" },
  { name: "Business", slug: "business" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Science", slug: "science" },
  { name: "Health", slug: "health" },
];

export function Header() {
  return (
    <header>
      {/* Top bar */}
      <div className="bg-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs">
          <span className="text-medium-gray">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/advertise"
              className="hover:text-gold transition-colors"
            >
              Advertise
            </Link>
            <Link
              href="/directory"
              className="hover:text-gold transition-colors"
            >
              Directory
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
            <a
              href="https://x.com/NewYorkJA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1"
              title="Follow us on X"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Logo section */}
      <div className="bg-navy border-b border-navy-dark">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <Link href="/">
            {/* 
            <h1 className="font-[family-name:var(--font-headline)] text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              NEW YORK JOURNAL AMERICAN
            </h1>
            <p className="text-gold text-[10px] md:text-xs tracking-[0.3em] mt-1 uppercase">
              An American Paper for the American People — Since 1882
            </p>
            */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={1000}
              height={500}
              className="w-full md:w-4/5 lg:w-3/5 h-auto mx-auto"
              priority
            />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center justify-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="px-3 py-3 text-sm font-medium text-dark-text hover:text-red-accent hover:border-b-2 hover:border-red-accent transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <MobileNav categories={categories} />
        </div>
      </nav>
    </header>
  );
}
