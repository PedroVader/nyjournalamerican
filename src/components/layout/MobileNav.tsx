"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileNavProps {
  categories: { name: string; slug: string }[];
}

export function MobileNav({ categories }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-3 text-dark-text"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="flex flex-col py-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-dark-text hover:bg-off-white hover:text-red-accent"
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link href="/advertise" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm text-medium-gray hover:text-red-accent block">
                Advertise
              </Link>
              <Link href="/directory" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm text-medium-gray hover:text-red-accent block">
                Directory
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
