export const CATEGORY_DEFINITIONS: Record<
  string,
  { name: string; description: string; order: number }
> = {
  us: {
    name: "U.S. News",
    description: "Breaking news and in-depth coverage from across the United States.",
    order: 1,
  },
  politics: {
    name: "Politics",
    description: "Political news, elections, policy and government coverage.",
    order: 2,
  },
  world: {
    name: "World",
    description: "International news and global affairs.",
    order: 3,
  },
  business: {
    name: "Business",
    description: "Markets, economy, finance and corporate news.",
    order: 4,
  },
  technology: {
    name: "Technology",
    description: "Tech industry news, innovation, startups and digital trends.",
    order: 5,
  },
  sports: {
    name: "Sports",
    description: "Latest scores, highlights and sports news coverage.",
    order: 6,
  },
  entertainment: {
    name: "Entertainment",
    description: "Movies, TV, music, celebrity news and pop culture.",
    order: 7,
  },
  health: {
    name: "Health",
    description: "Health news, medical research and wellness coverage.",
    order: 8,
  },
  science: {
    name: "Science",
    description: "Scientific discoveries, space, environment and research news.",
    order: 9,
  },
};

const CATEGORY_MAP: Record<string, string> = {
  // NewsAPI categories
  business: "business",
  technology: "technology",
  sports: "sports",
  entertainment: "entertainment",
  health: "health",
  science: "science",
  general: "us",

  // U.S. & General
  ap_news: "us",
  nyt_us: "us",
  bbc_us: "us",
  fox_latest: "us",
  cnn_top: "us",
  npr_news: "us",
  abc_top: "us",
  usatoday: "us",

  // Politics
  nyt_politics: "politics",
  politico: "politics",
  thehill: "politics",

  // World
  reuters: "world",
  wsj_world: "world",
  bbc_world: "world",
  guardian_world: "world",

  // Business & Finance
  nyt_business: "business",
  cnbc_top: "business",
  bloomberg: "business",
  marketwatch: "business",
  fortune: "business",

  // Technology
  nyt_tech: "technology",
  techcrunch: "technology",
  verge: "technology",
  ars: "technology",
  wired: "technology",
  engadget: "technology",

  // Sports
  espn: "sports",
  cbssports: "sports",

  // Science & Health
  nasa: "science",
  livescience: "science",
  nature: "science",
  medline: "health",

  // Entertainment
  ew: "entertainment",
  variety: "entertainment",
  hollywood: "entertainment",
};

export function mapToCategory(source: string, apiCategory?: string): string {
  return CATEGORY_MAP[apiCategory || source] || "us";
}
