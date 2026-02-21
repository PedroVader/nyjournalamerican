"use client";

import { useState } from "react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="font-[family-name:var(--font-headline)] text-white text-3xl md:text-4xl font-bold">
          Stay Ahead of the News
        </h2>
        <p className="text-gray-300 mt-3 text-lg max-w-2xl mx-auto">
          Join thousands of readers who start their morning with the New York
          Journal American daily briefing.
        </p>

        {status === "success" ? (
          <p className="text-gold text-lg font-semibold mt-6">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded text-dark-text"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-red-accent hover:bg-red-hover disabled:opacity-50 text-white font-semibold px-8 py-3 rounded transition-colors whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-300 text-sm mt-3">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-gray-500 text-xs mt-4">
          Free. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
