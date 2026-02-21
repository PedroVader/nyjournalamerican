import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | New York Journal American",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-4xl font-bold text-dark-text mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-lg max-w-none text-dark-text space-y-6">
        <p><em>Last updated: February 2026</em></p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">1. Acceptance of Terms</h2>
        <p>By accessing and using the New York Journal American website, you agree to be bound by these Terms of Service.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">2. Content</h2>
        <p>Our content is aggregated from reputable wire services and original reporting. We make reasonable efforts to ensure accuracy but do not guarantee the completeness or timeliness of all information. Source attribution is provided for all aggregated content.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">3. Sponsored Content</h2>
        <p>Some articles may be sponsored or contain paid placements. Sponsored content is clearly labeled where applicable. The views expressed in sponsored content are those of the advertiser.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">4. Business Directory</h2>
        <p>Listings in our business directory are paid placements. We do not endorse any listed business. Listing details are provided by the businesses themselves.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">5. Intellectual Property</h2>
        <p>All original content, design, and branding on this website is the property of New York Journal American. Aggregated content is attributed to its original source and remains the property of the respective publishers.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">6. Limitation of Liability</h2>
        <p>The New York Journal American is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from the use of this website.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">7. Changes</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of updated terms.</p>
      </div>
    </div>
  );
}
