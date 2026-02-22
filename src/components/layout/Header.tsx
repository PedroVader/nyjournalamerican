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
            <Link href="/advertise" className="hover:text-gold transition-colors">
              Advertise
            </Link>
            <Link href="/directory" className="hover:text-gold transition-colors">
              Directory
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
            <a
              href="https://en.wikipedia.org/wiki/New_York_Journal-American"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1"
              title="Wikipedia"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.407 0 .2.089.539.27 1.037l3.845 8.697 1.888-3.885-1.089-2.38c-.726-1.579-1.174-2.505-1.345-2.783-.2-.328-.609-.495-1.227-.495l-.164-.001c-.15 0-.225-.057-.225-.176v-.434l.049-.045h4.455l.052.045v.434c0 .119-.075.176-.225.176-.584.006-.876.096-.876.27 0 .164.12.489.36.972l1.601 3.45 1.521-3.122c.24-.494.36-.856.36-1.083 0-.346-.341-.52-1.021-.52-.15 0-.225-.057-.225-.176v-.434l.049-.045c.818-.005 3.401 0 3.401 0l.051.045v.434c0 .119-.075.176-.225.176-.96.037-1.545.408-1.757 1.113-.209.699-1.755 3.532-1.755 3.532l1.293 2.729 3.681-8.332c.165-.393.248-.7.248-.919 0-.26-.255-.399-.764-.418l-.388-.015c-.15 0-.225-.057-.225-.176v-.434l.049-.045c.709-.005 3.201 0 3.201 0l.051.045v.434c0 .119-.075.176-.225.176-.749.022-1.237.399-1.463 1.133L13.455 16.12c-.057.151-.181.227-.372.227-.164 0-.284-.068-.36-.206z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Logo section */}
      <div className="bg-navy border-b border-navy-dark">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <Link href="/">
            <h1 className="font-[family-name:var(--font-headline)] text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              NEW YORK JOURNAL AMERICAN
            </h1>
            <p className="text-gold text-[10px] md:text-xs tracking-[0.3em] mt-1 uppercase">
              An American Paper for the American People — Since 1882
            </p>
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
