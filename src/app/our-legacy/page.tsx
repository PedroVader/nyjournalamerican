import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Legacy | New York Journal American",
  description: "Explore the 140+ year history of the New York Journal American, from 1882 to the digital age.",
};

const timelineEvents = [
  { year: "1882", title: "Foundation", description: "The New York Morning Journal is established, beginning a new chapter in American journalism." },
  { year: "1895", title: "Hearst Acquisition", description: "William Randolph Hearst purchases the paper, transforming it into one of America's most powerful media outlets." },
  { year: "1898", title: "Spanish-American War", description: "The Journal plays a pivotal role in shaping public opinion during the Spanish-American War, exemplifying the era of Yellow Journalism." },
  { year: "1901", title: "National Influence", description: "The paper reaches peak circulation, becoming a household name across the United States." },
  { year: "1916", title: "Broadcasting Pioneer", description: "The Journal American hosts one of the first radio broadcasts of election results, pioneering multimedia journalism." },
  { year: "1937", title: "The Merger", description: "The New York American and the New York Evening Journal merge to form the New York Journal-American." },
  { year: "1945", title: "JFK Reports", description: "A young John F. Kennedy contributes reporting to the paper, covering international affairs before his political career." },
  { year: "1964", title: "Cultural Coverage", description: "The paper provides groundbreaking analysis of The Beatles' arrival in America, capturing the cultural zeitgeist." },
  { year: "1966", title: "Final Print Edition", description: "The print edition ceases publication after a newspaper strike, ending 84 years of continuous daily printing." },
  { year: "2026", title: "Digital Resurrection", description: "The New York Journal American is reborn as a digital-first publication, carrying forward its mission for a new generation." },
];

const notableFigures = [
  { name: "William Randolph Hearst", role: "Publisher & Owner (1895-1951)", description: "Media mogul who transformed the Journal into a national powerhouse." },
  { name: "Nellie Bly", role: "Investigative Journalist", description: "Pioneering journalist known for her record-breaking trip around the world and undercover investigations." },
  { name: "Dorothy Kilgallen", role: "Columnist & Reporter", description: "Renowned journalist and television personality who covered major stories for decades." },
  { name: "John F. Kennedy", role: "Guest Reporter (1945)", description: "Future president who contributed international reporting before entering politics." },
  { name: "Jimmy Breslin", role: "Columnist", description: "Pulitzer Prize-winning journalist known for his vivid street-level reporting." },
  { name: "Rube Goldberg", role: "Cartoonist", description: "Legendary cartoonist whose name became synonymous with complex contraptions." },
  { name: "Ford Frick", role: "Sports Editor", description: "Later became Commissioner of Major League Baseball." },
  { name: "Ambrose Bierce", role: "Writer & Journalist", description: "Acclaimed author and sharp-witted columnist." },
];

export default function OurLegacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl font-bold text-dark-text mb-4">
        Our Legacy
      </h1>
      <p className="text-xl text-medium-gray mb-12">
        Over 140 years of American journalism, from the age of print to the digital frontier.
      </p>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text border-b-2 border-navy pb-2 mb-8">
          Timeline
        </h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-navy/20" />
          <div className="space-y-8">
            {timelineEvents.map((event) => (
              <div key={event.year} className="relative flex gap-6">
                <div className="shrink-0 w-16 text-right">
                  <span className="font-[family-name:var(--font-headline)] text-lg font-bold text-red-accent">
                    {event.year}
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[13px] top-2 w-3 h-3 bg-navy rounded-full border-2 border-white" />
                  <div className="pl-4">
                    <h3 className="font-semibold text-dark-text text-lg">{event.title}</h3>
                    <p className="text-medium-gray mt-1">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Figures */}
      <section>
        <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text border-b-2 border-navy pb-2 mb-8">
          Notable Figures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notableFigures.map((figure) => (
            <div key={figure.name} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-dark-text">{figure.name}</h3>
              <p className="text-xs text-red-accent font-medium uppercase tracking-wide mt-0.5">
                {figure.role}
              </p>
              <p className="text-sm text-medium-gray mt-2">{figure.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
