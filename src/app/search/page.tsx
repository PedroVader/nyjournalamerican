"use client";

import { useState } from "react";
import { ArticleCardHorizontal } from "@/components/articles/ArticleCardHorizontal";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string };
  author: { name: string; slug: string };
  publishedAt: string | null;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text mb-6">
        Search
      </h1>
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <button
          type="submit"
          className="bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-dark transition-colors"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-medium-gray">Searching...</p>}

      {!loading && searched && results.length === 0 && (
        <p className="text-medium-gray text-center py-8">
          No results found for &quot;{query}&quot;. Try different keywords.
        </p>
      )}

      <div className="space-y-6">
        {results.map((r) => (
          <ArticleCardHorizontal
            key={r.id}
            title={r.title}
            slug={r.slug}
            excerpt={r.excerpt}
            featuredImage={r.featuredImage}
            category={r.category}
            author={r.author}
            publishedAt={r.publishedAt}
          />
        ))}
      </div>
    </div>
  );
}
