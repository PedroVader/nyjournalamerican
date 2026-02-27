"use client";

import { useState } from "react";

const partnershipOptions = [
  {
    name: "Sponsored Articles",
    desc: "Branded content published in relevant sections, reaching our engaged readership with your story.",
    features: [
      "Published in the most relevant section",
      "Professional editorial review",
      "Permanent placement on site",
      "Shared across our channels",
    ],
  },
  {
    name: "Content Series",
    desc: "A multi-article partnership for deeper audience engagement and sustained brand visibility.",
    features: [
      "Multiple articles over time",
      "Consistent brand presence",
      "Cross-linked content strategy",
      "Dedicated editorial support",
    ],
  },
  {
    name: "Brand Spotlight",
    desc: "A featured company profile highlighting your brand, mission, and achievements to our audience.",
    features: [
      "In-depth company profile",
      "Featured placement on site",
      "Custom imagery and branding",
      "Long-form storytelling",
    ],
  },
];

const directoryPlans = [
  {
    name: "Basic",
    features: ["Business name & link", "Category listing", "Short description"],
  },
  {
    name: "Pro",
    features: ["Everything in Basic", "Business logo", "Extended description", "Enhanced visibility"],
  },
  {
    name: "Premium",
    features: ["Everything in Pro", "Featured badge", "Priority placement", "Highlighted in search"],
  },
];

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
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
            Partner With<br />New York Journal American
          </h1>
          <p className="text-gray-300 text-xl mt-6 max-w-2xl mx-auto">
            Reach millions through premium content partnerships with one of
            America&apos;s historic news publications.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-center">
            <div>
              <p className="text-3xl font-bold text-gold">140+</p>
              <p className="text-sm text-gray-400">Years of Legacy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">Millions</p>
              <p className="text-sm text-gray-400">Monthly Readers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">Premium</p>
              <p className="text-sm text-gray-400">US Audience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text text-center mb-10">
          Why Partner With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Brand Visibility", desc: "Showcase your brand to a large, engaged American readership." },
            { title: "Trusted Platform", desc: "A recognized news brand with over 140 years of editorial heritage." },
            { title: "Premium Audience", desc: "Our readers are educated, influential decision-makers across the US." },
            { title: "Permanent Content", desc: "All published content remains live on our platform indefinitely." },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-dark-text text-lg">{item.title}</h3>
              <p className="text-sm text-medium-gray mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Options */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text text-center mb-4">
            Partnership Options
          </h2>
          <p className="text-center text-medium-gray mb-10 max-w-2xl mx-auto">
            We offer flexible content partnerships tailored to your goals. Contact us for custom solutions and pricing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partnershipOptions.map((option) => (
              <div
                key={option.name}
                className="bg-white rounded-lg p-8 border-2 border-gray-200"
              >
                <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text">
                  {option.name}
                </h3>
                <p className="text-sm text-medium-gray mt-2">{option.desc}</p>
                <ul className="mt-6 space-y-3">
                  {option.features.map((f) => (
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
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full mt-8 py-3 rounded-lg font-semibold transition-colors bg-navy hover:bg-navy-dark text-white"
                >
                  Get in Touch
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Listings */}
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

      {/* How It Works */}
      <section className="bg-off-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-dark-text mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Reach Out", desc: "Tell us about your brand and goals through the form below." },
              { step: "2", title: "We Plan Together", desc: "Our editorial team works with you to craft the right content strategy." },
              { step: "3", title: "Content Goes Live", desc: "Your content is published and promoted to our readership." },
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
          Start a Conversation
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
            <textarea
              placeholder="Tell us about your brand and what you're looking to achieve..."
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
              {status === "loading" ? "Sending..." : "Send Inquiry"}
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
            All published content remains live permanently on our platform.
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            Trusted by leading brands, agencies, and organizations nationwide.
          </p>
        </div>
      </section>
    </div>
  );
}
