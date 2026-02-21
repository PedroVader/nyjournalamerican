import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | New York Journal American",
  description: "Learn about the New York Journal American, a historic American newspaper revived for the digital age.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl font-bold text-dark-text mb-8">
        About New York Journal American
      </h1>

      <div className="prose prose-lg max-w-none text-dark-text">
        <p className="text-xl text-medium-gray leading-relaxed">
          Founded in 1882, the New York Journal American has been a cornerstone of American
          journalism for over 140 years. Today, we continue that legacy in the digital age,
          delivering trusted news and analysis to readers across the nation.
        </p>

        <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold mt-10 mb-4">
          Our Mission
        </h2>
        <p>
          To deliver accurate, timely, and comprehensive news coverage that empowers
          Americans to make informed decisions. We believe in the fundamental role of
          a free press in a democratic society.
        </p>

        <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold mt-10 mb-4">
          A Rich Heritage
        </h2>
        <p>
          The New York Journal American traces its roots to 1882 when it was first
          established as the New York Morning Journal. Under the ownership of William
          Randolph Hearst beginning in 1895, the paper became one of the most influential
          publications in American history, helping shape the nation during pivotal moments
          including the Spanish-American War, both World Wars, and the cultural revolutions
          of the 20th century.
        </p>
        <p>
          Notable figures who contributed to or were covered by the paper include
          Nellie Bly, Dorothy Kilgallen, John F. Kennedy (who served as a guest
          reporter), Jimmy Breslin, Rube Goldberg, and Ambrose Bierce.
        </p>

        <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold mt-10 mb-4">
          Digital Revival
        </h2>
        <p>
          In 2026, the New York Journal American was reborn as a digital-first publication,
          combining the best traditions of American journalism with modern technology.
          We aggregate news from trusted wire services and original reporting to provide
          comprehensive coverage across politics, business, technology, sports, and more.
        </p>

        <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold mt-10 mb-4">
          Our Coverage
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>U.S. News &amp; Politics</li>
          <li>World Affairs</li>
          <li>Business &amp; Finance</li>
          <li>Technology &amp; Innovation</li>
          <li>Sports</li>
          <li>Entertainment &amp; Culture</li>
          <li>Science &amp; Health</li>
        </ul>
      </div>

      <div className="mt-12 p-8 bg-navy-dark rounded-lg text-center text-white">
        <p className="font-[family-name:var(--font-headline)] text-xl font-bold">
          &ldquo;An American Paper for the American People&rdquo;
        </p>
        <p className="text-gold text-sm mt-2 tracking-wider">Since 1882</p>
      </div>
    </div>
  );
}
