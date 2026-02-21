import { Metadata } from "next";

const SITE_NAME = "New York Journal American";
const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://newyorkjournalamerican.com";
const SITE_DESCRIPTION =
  "An American Paper for the American People — Breaking news, analysis, and in-depth coverage of US and world events since 1882.";

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description || SITE_DESCRIPTION;
  const ogImage = image || `${SITE_URL}/og-image.jpg`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description: desc,
      url: url || SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    alternates: {
      canonical: url || SITE_URL,
    },
  };
}

export function generateArticleJsonLd({
  title,
  description,
  image,
  url,
  publishedAt,
  author,
  category,
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  publishedAt: string;
  author: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    image: image || undefined,
    url,
    datePublished: publishedAt,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    articleSection: category,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    foundingDate: "1882",
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
}
