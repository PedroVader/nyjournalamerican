import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | New York Journal American",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-4xl font-bold text-dark-text mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-lg max-w-none text-dark-text space-y-6">
        <p><em>Last updated: February 2026</em></p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">1. Information We Collect</h2>
        <p>We collect information you voluntarily provide, such as your name and email address when subscribing to our newsletter or submitting a contact form. We also collect standard web analytics data including page views, browser type, and IP addresses.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">2. How We Use Your Information</h2>
        <p>Your information is used to deliver our newsletter, respond to inquiries, improve our website, and serve relevant advertising. We do not sell your personal information to third parties.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">3. Cookies</h2>
        <p>We use cookies and similar technologies for analytics, personalization, and advertising purposes. You can manage cookie preferences through your browser settings.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">4. Third-Party Services</h2>
        <p>We may use third-party services such as Google Analytics, advertising networks, and social media platforms that have their own privacy policies.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">5. Data Security</h2>
        <p>We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>

        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold">6. Contact</h2>
        <p>For privacy-related questions, contact us through our <a href="/contact" className="text-red-accent hover:text-red-hover">contact page</a>.</p>
      </div>
    </div>
  );
}
