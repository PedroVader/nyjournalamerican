interface ContentBlock {
  type: "paragraph" | "heading" | "blockquote" | "list";
  content: { type: "text"; text: string }[];
  attrs?: { level?: number };
  items?: string[];
}

function decodeEntities(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const NOISE_PATTERNS = [
  /^advertisement$/i,
  /^subscribe/i,
  /^sign up/i,
  /^read more/i,
  /^copyright/i,
  /^share this/i,
  /^follow us/i,
  /^related:/i,
  /^recommended/i,
  /^trending/i,
  /^also read/i,
  /^click here/i,
  /cookie/i,
  /newsletter/i,
  /^loading/i,
  /^please enable/i,
  /^this (article|story) (is|was) (originally|first) published/i,
  /^get the app/i,
  /^download our/i,
];

function isNoise(text: string): boolean {
  if (text.length < 30) return true;
  return NOISE_PATTERNS.some((p) => p.test(text));
}

export async function scrapeArticleContent(
  url: string
): Promise<ContentBlock[] | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; NewYorkJournalAmerican/1.0; +https://newyorkjournalamerican.com)",
        Accept: "text/html",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);
    if (!res.ok) return null;

    const html = await res.text();

    // Try to find article body
    const articleMatch =
      html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
      html.match(
        /<div[^>]+class="[^"]*(?:article-body|story-body|entry-content|post-content|article-content|ArticleBody|StoryBodyCompanionColumn|article__body|story__content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i
      ) ||
      html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

    const bodyHtml = articleMatch?.[1] || articleMatch?.[2] || html;

    const blocks: ContentBlock[] = [];

    // Extract headings, paragraphs, blockquotes, and lists in order
    const blockRegex =
      /<(h[2-4]|p|blockquote|ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
    let match;

    while ((match = blockRegex.exec(bodyHtml)) !== null) {
      const tag = match[1].toLowerCase();
      const rawContent = match[2];
      const text = decodeEntities(rawContent);

      if (tag.startsWith("h")) {
        if (text.length > 5 && text.length < 200 && !isNoise(text)) {
          const level = parseInt(tag[1]);
          blocks.push({
            type: "heading",
            content: [{ type: "text", text }],
            attrs: { level },
          });
        }
      } else if (tag === "blockquote") {
        // Extract inner paragraphs from blockquote
        const innerText = decodeEntities(rawContent);
        if (innerText.length > 20 && !isNoise(innerText)) {
          blocks.push({
            type: "blockquote",
            content: [{ type: "text", text: innerText }],
          });
        }
      } else if (tag === "ul" || tag === "ol") {
        const items: string[] = [];
        const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
        let liMatch;
        while ((liMatch = liRegex.exec(rawContent)) !== null) {
          const liText = decodeEntities(liMatch[1]);
          if (liText.length > 10) items.push(liText);
        }
        if (items.length >= 2) {
          blocks.push({
            type: "list",
            content: [],
            items,
          });
        }
      } else if (tag === "p") {
        if (!isNoise(text)) {
          blocks.push({
            type: "paragraph",
            content: [{ type: "text", text }],
          });
        }
      }
    }

    // Need at least 3 meaningful blocks
    if (blocks.filter((b) => b.type === "paragraph").length >= 3) {
      return blocks.slice(0, 25);
    }

    return null;
  } catch {
    return null;
  }
}
