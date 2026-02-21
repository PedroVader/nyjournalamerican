import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-[family-name:var(--font-headline)] text-6xl font-bold text-navy mb-4">
        404
      </h1>
      <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text mb-4">
        Page Not Found
      </h2>
      <p className="text-medium-gray mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/search"
          className="border border-gray-300 text-dark-text font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Search Articles
        </Link>
      </div>
    </div>
  );
}
