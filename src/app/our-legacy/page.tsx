import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Legacy | New York Journal American",
  description:
    "Explore the 140+ year history of the New York Journal American, from its 1882 founding through the golden age of print to the digital age.",
};

const timelineEvents = [
  {
    year: "1882",
    title: "The Morning Journal Is Born",
    description:
      "The New York Morning Journal is established on Park Row, joining the fiercely competitive press corridor known as Newspaper Row. From its inception, it championed bold headlines and accessible reporting for working-class New Yorkers.",
    era: "Foundation",
  },
  {
    year: "1895",
    title: "Hearst Takes the Helm",
    description:
      "William Randolph Hearst acquires the struggling paper for $180,000, immediately investing in top-tier talent, sensational headlines, and aggressive investigative reporting. The Journal enters a fierce circulation war with Joseph Pulitzer's New York World.",
    era: "Rise",
  },
  {
    year: "1896",
    title: "The Yellow Kid & Yellow Journalism",
    description:
      "The Journal hires cartoonist R.F. Outcault and his famous Yellow Kid strip from the World, igniting the rivalry that gives 'Yellow Journalism' its name. The term would come to define an entire era of American media.",
    era: "Rise",
  },
  {
    year: "1898",
    title: "Remember the Maine!",
    description:
      "After the USS Maine explodes in Havana harbor, the Journal's sensational coverage helps push the nation toward the Spanish-American War. Hearst reportedly tells illustrator Frederic Remington: 'You furnish the pictures, and I'll furnish the war.'",
    era: "Rise",
  },
  {
    year: "1901",
    title: "One Million Copies",
    description:
      "The Journal reaches a daily circulation of over one million copies, making it one of the most widely read newspapers in the world. Its Sunday editions feature illustrations, comics, and long-form journalism that captivate readers nationwide.",
    era: "Peak",
  },
  {
    year: "1916",
    title: "Election Night on the Air",
    description:
      "The Journal-American hosts one of the first radio broadcasts of presidential election results, foreshadowing the coming era of multimedia journalism. The paper's reach now extends beyond the printed page.",
    era: "Innovation",
  },
  {
    year: "1937",
    title: "Two Papers Become One",
    description:
      "The New York American (formerly the Morning Journal) and the New York Evening Journal merge under Hearst's direction to form the New York Journal-American, consolidating Hearst's flagship newspaper operations in the city.",
    era: "Consolidation",
  },
  {
    year: "1945",
    title: "A Future President Files Dispatches",
    description:
      "A young John F. Kennedy, fresh from his Navy service in the Pacific, contributes reporting on the founding of the United Nations in San Francisco and the Potsdam Conference in Germany. His byline would later adorn the Oval Office.",
    era: "Golden Age",
  },
  {
    year: "1950s",
    title: "Dorothy Kilgallen's Beat",
    description:
      "Star columnist Dorothy Kilgallen becomes a national celebrity through her Journal-American column 'The Voice of Broadway' and her appearances on the CBS game show 'What's My Line?' She covers the Sam Sheppard murder trial, the JFK assassination, and the inner workings of organized crime.",
    era: "Golden Age",
  },
  {
    year: "1964",
    title: "Beatlemania Hits New York",
    description:
      "The Journal-American covers The Beatles' arrival at JFK Airport and their appearances on The Ed Sullivan Show, providing readers with front-row seats to the cultural revolution reshaping America and the world.",
    era: "Golden Age",
  },
  {
    year: "1966",
    title: "The Presses Stop",
    description:
      "After prolonged labor disputes cripple New York's newspaper industry, the Journal-American publishes its final edition and merges with the Herald Tribune and the World-Telegram & Sun to form the short-lived World Journal Tribune. An 84-year era of daily printing comes to a close.",
    era: "Farewell",
  },
  {
    year: "2026",
    title: "The Digital Resurrection",
    description:
      "The New York Journal American is reborn as a digital-first publication, inheriting the name, the mission, and the spirit of its predecessor. Combining trusted wire services with modern technology, it carries the torch of independent American journalism into a new century.",
    era: "Revival",
  },
];

const notableFigures = [
  {
    name: "William Randolph Hearst",
    role: "Publisher & Owner, 1895 \u2013 1951",
    description:
      "The towering media mogul who built the Journal into a national powerhouse. Hearst's empire eventually spanned 28 newspapers, 18 magazines, several radio stations, and a film company. His influence on American culture and politics was unrivaled in the 20th century.",
  },
  {
    name: "Nellie Bly",
    role: "Investigative Journalist",
    description:
      "Pioneered undercover investigative reporting. Her 1889 record-breaking trip around the world in 72 days made her a household name. She exposed conditions in mental asylums and sweatshops, setting the standard for advocacy journalism.",
  },
  {
    name: "Dorothy Kilgallen",
    role: "Columnist & Reporter, 1931 \u2013 1965",
    description:
      "One of the most prominent female journalists of the 20th century. Her 'Voice of Broadway' column was syndicated to over 200 papers. She covered the Lindbergh kidnapping trial, the Sam Sheppard case, and was investigating the JFK assassination at the time of her death.",
  },
  {
    name: "John F. Kennedy",
    role: "Guest Correspondent, 1945",
    description:
      "Before entering politics, JFK filed dispatches from the founding of the United Nations and the Potsdam Conference. His journalistic instincts shaped his legendary communication skills as president.",
  },
  {
    name: "Jimmy Breslin",
    role: "Columnist",
    description:
      "Pulitzer Prize-winning columnist known for his vivid, street-level reporting that gave voice to ordinary New Yorkers. His column on the gravedigger at JFK's funeral became one of the most celebrated newspaper pieces in American history.",
  },
  {
    name: "Rube Goldberg",
    role: "Cartoonist & Sculptor",
    description:
      "Legendary cartoonist whose wildly complex contraption drawings became so iconic that 'Rube Goldberg machine' entered the dictionary. He won the Pulitzer Prize for editorial cartooning in 1948.",
  },
  {
    name: "Ford Frick",
    role: "Sports Editor, 1922 \u2013 1934",
    description:
      "Rose from sportswriter to sports editor at the Journal, later becoming president of the National League and ultimately Commissioner of Major League Baseball from 1951 to 1965.",
  },
  {
    name: "Ambrose Bierce",
    role: "Writer & Columnist",
    description:
      "The acid-tongued satirist and author of 'The Devil's Dictionary' contributed sharp-witted commentary on politics and society. Known as 'Bitter Bierce,' he disappeared in Mexico in 1913 and was never found.",
  },
];

const stats = [
  { value: "1882", label: "Year Founded" },
  { value: "84", label: "Years in Print" },
  { value: "1M+", label: "Peak Daily Circulation" },
  { value: "140+", label: "Years of History" },
];

const ERA_COLORS: Record<string, string> = {
  Foundation: "bg-navy",
  Rise: "bg-red-accent",
  Peak: "bg-gold text-navy",
  Innovation: "bg-navy",
  Consolidation: "bg-medium-gray",
  "Golden Age": "bg-gold text-navy",
  Farewell: "bg-dark-text",
  Revival: "bg-red-accent",
};

export default function OurLegacyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-dark text-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gold text-xs md:text-sm tracking-[0.35em] uppercase mb-4">
            Since 1882
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Our Legacy
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From the ink-stained presses of Newspaper Row to the screens of a
            connected world, the New York Journal American has chronicled over
            140 years of American life.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold text-red-accent">
                {stat.value}
              </p>
              <p className="text-sm text-medium-gray mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro Prose */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none text-dark-text">
          <p className="text-lg leading-relaxed">
            The story of the New York Journal American is inseparable from the
            story of modern American journalism itself. It was born in the age of
            fiercely independent newspapers, rose to power under the most
            ambitious publisher the country had ever seen, shaped the way
            millions of Americans understood their world, and produced some of
            the most celebrated reporters, columnists, and cartoonists of the
            20th century.
          </p>
          <p className="text-lg leading-relaxed">
            When the paper&apos;s presses finally fell silent in 1966, it left
            behind a legacy that echoes through every newsroom in America. Now,
            in 2026, that legacy lives again &mdash; reimagined for the digital
            age, but anchored in the same mission: to be an American paper for
            the American people.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold text-dark-text mb-2 text-center">
            A Timeline of the Journal
          </h2>
          <p className="text-medium-gray text-center mb-12">
            Key moments that defined the paper and shaped American journalism.
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-navy/20 -translate-x-1/2" />

            <div className="space-y-12">
              {timelineEvents.map((event, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={event.year}
                    className="relative md:flex md:items-start"
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1 z-10">
                      <div className="w-4 h-4 rounded-full bg-navy border-4 border-gray-50" />
                    </div>

                    {/* Mobile layout (always right) */}
                    <div className="md:hidden pl-14">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white mb-2 ${ERA_COLORS[event.era] || "bg-navy"}`}
                      >
                        {event.era}
                      </span>
                      <p className="font-[family-name:var(--font-headline)] text-xl font-bold text-red-accent">
                        {event.year}
                      </p>
                      <h3 className="font-semibold text-dark-text text-lg mt-0.5">
                        {event.title}
                      </h3>
                      <p className="text-medium-gray mt-2 leading-relaxed text-sm">
                        {event.description}
                      </p>
                    </div>

                    {/* Desktop alternating layout */}
                    <div className="hidden md:grid md:grid-cols-2 md:gap-12 w-full">
                      {isLeft ? (
                        <>
                          <div className="text-right pr-8">
                            <span
                              className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white mb-2 ${ERA_COLORS[event.era] || "bg-navy"}`}
                            >
                              {event.era}
                            </span>
                            <p className="font-[family-name:var(--font-headline)] text-2xl font-bold text-red-accent">
                              {event.year}
                            </p>
                            <h3 className="font-semibold text-dark-text text-lg mt-0.5">
                              {event.title}
                            </h3>
                            <p className="text-medium-gray mt-2 leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                          <div />
                        </>
                      ) : (
                        <>
                          <div />
                          <div className="pl-8">
                            <span
                              className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white mb-2 ${ERA_COLORS[event.era] || "bg-navy"}`}
                            >
                              {event.era}
                            </span>
                            <p className="font-[family-name:var(--font-headline)] text-2xl font-bold text-red-accent">
                              {event.year}
                            </p>
                            <h3 className="font-semibold text-dark-text text-lg mt-0.5">
                              {event.title}
                            </h3>
                            <p className="text-medium-gray mt-2 leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Notable Figures */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold text-dark-text mb-2 text-center">
          The People Who Made the Paper
        </h2>
        <p className="text-medium-gray text-center mb-12">
          Journalists, publishers, and visionaries who wrote history through its
          pages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notableFigures.map((figure) => (
            <div
              key={figure.name}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                  <span className="font-[family-name:var(--font-headline)] text-white text-lg font-bold">
                    {figure.name.replace(/^Dr\.\s*/, "").charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-headline)] font-bold text-dark-text text-lg">
                    {figure.name}
                  </h3>
                  <p className="text-xs text-red-accent font-semibold uppercase tracking-wide mt-0.5">
                    {figure.role}
                  </p>
                  <p className="text-sm text-medium-gray mt-3 leading-relaxed">
                    {figure.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-navy-dark text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <blockquote className="font-[family-name:var(--font-headline)] text-2xl md:text-3xl font-bold leading-snug">
            &ldquo;You furnish the pictures, and I&apos;ll furnish the
            war.&rdquo;
          </blockquote>
          <p className="text-gold mt-4 text-sm tracking-wider uppercase">
            Attributed to William Randolph Hearst, 1897
          </p>
          <p className="text-gray-400 mt-6 text-sm leading-relaxed max-w-xl mx-auto">
            Whether he truly said it or not, the quote captures the spirit of an
            era when the Journal wielded more influence over American public
            opinion than any other single newspaper.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-[family-name:var(--font-headline)] text-2xl md:text-3xl font-bold text-dark-text mb-4">
          The Story Continues
        </h2>
        <p className="text-medium-gray mb-8 max-w-xl mx-auto">
          In 2026, the New York Journal American returned &mdash; digital,
          independent, and committed to the same mission it has carried since
          1882. We invite you to be part of the next chapter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-block bg-navy hover:bg-navy-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Read Today&apos;s News
          </a>
          <a
            href="/about"
            className="inline-block border border-gray-300 text-dark-text font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            About Us
          </a>
        </div>
      </section>
    </div>
  );
}
