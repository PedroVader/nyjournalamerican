"use client";

import { useState } from "react";

const packages = [
  {
    name: "Starter",
    features: [
      "Article up to 500 words",
      "1 dofollow backlink",
      "Published in relevant category",
      "Indexed by Google",
      "Permanent placement",
    ],
    popular: false,
  },
  {
    name: "Professional",
    features: [
      "Article up to 1,000 words",
      "2 dofollow backlinks",
      "Custom featured image",
      "Shared on social media",
      "Indexed by Google",
      "Permanent placement",
    ],
    popular: true,
  },
  {
    name: "Premium",
    features: [
      "Article up to 1,500 words",
      "3 dofollow backlinks",
      "Featured on homepage for 7 days",
      "Custom images & anchor text",
      "Priority publishing",
      "Permanent placement",
    ],
    popular: false,
  },
];

const directoryPlans = [
  {
    name: "Basic",
    features: ["Business name & link", "Category listing", "Short description", "Nofollow link"],
  },
  {
    name: "Pro",
    features: ["Everything in Basic", "Business logo", "Extended description", "Dofollow link"],
  },
  {
    name: "Premium",
    features: ["Everything in Pro", "Featured badge", "Priority placement", "1 guest post/month included"],
  },
];

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    selectedPackage: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "advertise" }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-dark text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-6xl font-bold leading-tight">
            Publish on<br />New York Journal American
          </h1>
          <p className="text-gray-300 text-xl mt-6 max-w-2xl mx-auto">
            Reach a US-focused audience with a guest post on one of America&apos;s
            historic news publications. Get permanent dofollow backlinks from a
            trusted news domain.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-center">
            <div>
              <p className="text-3xl font-bold text-gold">140+</p>
              <p className="text-sm text-gray-400">Years of Legacy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">24-48h</p>
              <p className="text-sm text-gray-400">Publishing Time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">100%</p>
              <p className="text-sm text-gray-400">Permanent Links</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text text-center mb-10">
          Why Publish With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Premium Domain", desc: "A recognized news brand with over 140 years of history." },
            { title: "US Audience", desc: "Content reaches an American, English-speaking readership." },
            { title: "Fast Publishing", desc: "Articles reviewed and published within 24-48 hours." },
            { title: "Permanent Links", desc: "All published content stays live permanently. We never remove posts." },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-dark-text text-lg">{item.title}</h3>
              <p className="text-sm text-medium-gray mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guest Post Packages */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text text-center mb-10">
            Guest Post Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-white rounded-lg p-8 border-2 ${
                  pkg.popular ? "border-red-accent shadow-lg scale-105" : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <span className="bg-red-accent text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text mt-4">
                  {pkg.name}
                </h3>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-medium-gray">
                      <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setFormData((d) => ({ ...d, selectedPackage: `Guest Post - ${pkg.name}` }));
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full mt-8 py-3 rounded-lg font-semibold transition-colors ${
                    pkg.popular
                      ? "bg-red-accent hover:bg-red-hover text-white"
                      : "bg-navy hover:bg-navy-dark text-white"
                  }`}
                >
                  Request a Quote
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-medium-gray mt-6">
            Enterprise / Bulk orders? Contact us for custom pricing on 5, 10, or 20+ articles.
          </p>
        </div>
      </section>

      {/* Directory Plans */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text text-center mb-10">
          Business Directory Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {directoryPlans.map((plan) => (
            <div key={plan.name} className="border border-gray-200 rounded-lg p-8">
              <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-dark-text">
                {plan.name}
              </h3>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-medium-gray">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-off-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose a Package", desc: "Select the guest post or directory plan that fits your needs." },
              { step: "2", title: "Send Your Article", desc: "Submit your content or let us write it for you with your target keywords." },
              { step: "3", title: "Published in 24-48h", desc: "Your article goes live with permanent dofollow backlinks." },
            ].map((item) => (
              <div key={item.step}>
                <div className="w-12 h-12 bg-red-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-dark-text mt-4 text-lg">{item.title}</h3>
                <p className="text-sm text-medium-gray mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text text-center mb-8">
          Get Started Today
        </h2>

        {status === "success" ? (
          <div className="text-center p-8 bg-green-50 rounded-lg">
            <p className="text-green-700 font-semibold text-lg">
              Thank you! We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Company / Website"
              value={formData.company}
              onChange={(e) => setFormData((d) => ({ ...d, company: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
            <select
              value={formData.selectedPackage}
              onChange={(e) => setFormData((d) => ({ ...d, selectedPackage: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-medium-gray"
            >
              <option value="">Select a Package</option>
              <option>Guest Post - Starter</option>
              <option>Guest Post - Professional</option>
              <option>Guest Post - Premium</option>
              <option>Guest Post - Enterprise / Bulk</option>
              <option>Directory - Basic</option>
              <option>Directory - Pro</option>
              <option>Directory - Premium</option>
            </select>
            <textarea
              placeholder="Tell us about your project, target keywords, and any requirements..."
              value={formData.message}
              onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-red-accent hover:bg-red-hover disabled:opacity-50 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
            >
              {status === "loading" ? "Sending..." : "Submit Inquiry"}
            </button>
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </section>

      {/* Trust */}
      <section className="bg-navy-dark text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            All posts are permanently indexed. We never remove published content.
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            Trusted by SEO agencies, businesses, and marketers worldwide.
          </p>
        </div>
      </section>
    </div>
  );
}
