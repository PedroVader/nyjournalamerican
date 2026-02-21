import Link from "next/link";

const footerSections = [
  {
    title: "Sections",
    links: [
      { name: "U.S. News", href: "/us" },
      { name: "World", href: "/world" },
      { name: "Politics", href: "/politics" },
      { name: "Business", href: "/business" },
      { name: "Technology", href: "/technology" },
      { name: "Sports", href: "/sports" },
    ],
  },
  {
    title: "More",
    links: [
      { name: "Entertainment", href: "/entertainment" },
      { name: "Science", href: "/science" },
      { name: "Health", href: "/health" },
      { name: "Search", href: "/search" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Legacy", href: "/our-legacy" },
      { name: "Advertise With Us", href: "/advertise" },
      { name: "Business Directory", href: "/directory" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Newsletter banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold">
              The Daily Briefing
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Get the top stories delivered to your inbox every morning.
            </p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded text-sm text-dark-text bg-white w-full md:w-64"
            />
            <button className="bg-red-accent hover:bg-red-hover text-white text-sm font-semibold px-6 py-2 rounded transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-[family-name:var(--font-headline)] text-lg font-bold">
              NEW YORK JOURNAL AMERICAN
            </p>
            <p className="text-xs text-gray-500 mt-1">
              An American Paper for the American People — Since 1882
            </p>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} New York Journal American. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
