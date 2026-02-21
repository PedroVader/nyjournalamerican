"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-4xl font-bold text-dark-text mb-4">
        Contact Us
      </h1>
      <p className="text-medium-gray mb-8">
        Have a question, story tip, or interested in advertising? We&apos;d love to hear from you.
      </p>

      {status === "success" ? (
        <div className="p-8 bg-green-50 rounded-lg text-center">
          <p className="text-green-700 font-semibold">Message sent! We&apos;ll respond within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData((d) => ({ ...d, subject: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <textarea
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-navy hover:bg-navy-dark disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">Something went wrong.</p>
          )}
        </form>
      )}

      <div className="mt-12 p-6 bg-off-white rounded-lg">
        <h2 className="font-semibold text-dark-text mb-3">Other Ways to Reach Us</h2>
        <p className="text-sm text-medium-gray">
          For advertising inquiries, visit our{" "}
          <a href="/advertise" className="text-red-accent hover:text-red-hover underline">
            Advertise
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
