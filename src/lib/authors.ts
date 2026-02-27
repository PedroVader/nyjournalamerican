import { prisma } from "@/lib/prisma/client";

interface AuthorDef {
  name: string;
  slug: string;
  email: string;
  bio: string;
}

const CATEGORY_AUTHORS: Record<string, [AuthorDef, AuthorDef]> = {
  us: [
    {
      name: "James Crawford",
      slug: "james-crawford",
      email: "james.crawford@newyorkjournalamerican.com",
      bio: "James Crawford is a national correspondent covering breaking news and domestic affairs across the United States.",
    },
    {
      name: "Sarah Mitchell",
      slug: "sarah-mitchell",
      email: "sarah.mitchell@newyorkjournalamerican.com",
      bio: "Sarah Mitchell reports on American communities, social trends, and national stories shaping the country.",
    },
  ],
  politics: [
    {
      name: "Michael Brennan",
      slug: "michael-brennan",
      email: "michael.brennan@newyorkjournalamerican.com",
      bio: "Michael Brennan covers Washington politics, elections, and policy developments for the New York Journal American.",
    },
    {
      name: "Victoria Hayes",
      slug: "victoria-hayes",
      email: "victoria.hayes@newyorkjournalamerican.com",
      bio: "Victoria Hayes is a political analyst and reporter focused on Congress, the White House, and federal policy.",
    },
  ],
  world: [
    {
      name: "Alexander Webb",
      slug: "alexander-webb",
      email: "alexander.webb@newyorkjournalamerican.com",
      bio: "Alexander Webb is an international correspondent reporting on global affairs, diplomacy, and conflict.",
    },
    {
      name: "Natasha Petrov",
      slug: "natasha-petrov",
      email: "natasha.petrov@newyorkjournalamerican.com",
      bio: "Natasha Petrov covers international news with a focus on Europe, the Middle East, and emerging global trends.",
    },
  ],
  business: [
    {
      name: "Robert Kingsley",
      slug: "robert-kingsley",
      email: "robert.kingsley@newyorkjournalamerican.com",
      bio: "Robert Kingsley reports on markets, corporate news, and economic trends for the Journal American.",
    },
    {
      name: "Catherine Chen",
      slug: "catherine-chen",
      email: "catherine.chen@newyorkjournalamerican.com",
      bio: "Catherine Chen covers finance, Wall Street, and the global economy with a focus on business strategy.",
    },
  ],
  technology: [
    {
      name: "David Park",
      slug: "david-park",
      email: "david.park@newyorkjournalamerican.com",
      bio: "David Park covers the tech industry, startups, and digital innovation for the Journal American.",
    },
    {
      name: "Lauren Schafer",
      slug: "lauren-schafer",
      email: "lauren.schafer@newyorkjournalamerican.com",
      bio: "Lauren Schafer reports on artificial intelligence, cybersecurity, and the intersection of technology and society.",
    },
  ],
  sports: [
    {
      name: "Marcus Thompson",
      slug: "marcus-thompson",
      email: "marcus.thompson@newyorkjournalamerican.com",
      bio: "Marcus Thompson is a sports correspondent covering the NFL, NBA, and major American sporting events.",
    },
    {
      name: "Jennifer Reeves",
      slug: "jennifer-reeves",
      email: "jennifer.reeves@newyorkjournalamerican.com",
      bio: "Jennifer Reeves covers college sports, the Olympics, and athletic culture across the nation.",
    },
  ],
  entertainment: [
    {
      name: "Christopher Blake",
      slug: "christopher-blake",
      email: "christopher.blake@newyorkjournalamerican.com",
      bio: "Christopher Blake covers Hollywood, streaming, and the entertainment industry for the Journal American.",
    },
    {
      name: "Amanda Sterling",
      slug: "amanda-sterling",
      email: "amanda.sterling@newyorkjournalamerican.com",
      bio: "Amanda Sterling reports on music, pop culture, celebrity news, and the arts.",
    },
  ],
  science: [
    {
      name: "Dr. Thomas Wright",
      slug: "thomas-wright",
      email: "thomas.wright@newyorkjournalamerican.com",
      bio: "Dr. Thomas Wright is a science writer covering space exploration, physics, and environmental research.",
    },
    {
      name: "Dr. Elena Vasquez",
      slug: "elena-vasquez",
      email: "elena.vasquez@newyorkjournalamerican.com",
      bio: "Dr. Elena Vasquez reports on scientific discoveries, climate research, and emerging technologies.",
    },
  ],
  health: [
    {
      name: "Dr. Jonathan Miller",
      slug: "jonathan-miller",
      email: "jonathan.miller@newyorkjournalamerican.com",
      bio: "Dr. Jonathan Miller covers public health, medical breakthroughs, and healthcare policy.",
    },
    {
      name: "Dr. Priya Kapoor",
      slug: "priya-kapoor",
      email: "priya.kapoor@newyorkjournalamerican.com",
      bio: "Dr. Priya Kapoor reports on wellness, mental health, and medical research developments.",
    },
  ],
};

// Cache author IDs in memory to avoid repeated DB lookups within the same cron run
const authorIdCache = new Map<string, string>();

async function ensureAuthor(def: AuthorDef): Promise<string> {
  const cached = authorIdCache.get(def.slug);
  if (cached) return cached;

  let author = await prisma.author.findUnique({
    where: { slug: def.slug },
  });

  if (!author) {
    author = await prisma.author.create({
      data: {
        name: def.name,
        slug: def.slug,
        email: def.email,
        bio: def.bio,
        role: "writer",
      },
    });
  }

  authorIdCache.set(def.slug, author.id);
  return author.id;
}

export async function getAuthorForCategory(
  categorySlug: string,
  articleTitle: string
): Promise<string> {
  const authors = CATEGORY_AUTHORS[categorySlug];
  if (!authors) {
    // Fallback to US authors for unknown categories
    const fallback = CATEGORY_AUTHORS["us"];
    const index = simpleHash(articleTitle) % 2;
    return ensureAuthor(fallback[index]);
  }

  // Alternate between two authors based on title hash
  const index = simpleHash(articleTitle) % 2;
  return ensureAuthor(authors[index]);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
