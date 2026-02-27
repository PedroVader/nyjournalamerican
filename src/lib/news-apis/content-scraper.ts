import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

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

const NOISE_EXACT = new Set([
  "advertisement",
  "loading",
  "sponsored",
  "trending",
  "recommended",
  "ad choices",
  "continue reading",
]);

function isNoise(text: string): boolean {
  if (text.length < 25 || text.length > 3000) return true;
  const lower = text.toLowerCase();
  if (NOISE_EXACT.has(lower)) return true;
  if (
    /^(subscribe|sign up|read more|copyright|share this|share on|share via|tweet this|pin it|follow us|connect with us|join the conversation|sign in|log in|create account|register|related:|also read|click here|please enable|get the app|download our|you (may|might) also|more from|tap to play|accept|we use cookies|privacy|terms of|all rights|skip to|jump to|back to top)/i.test(
      text
    )
  )
    return true;
  if (/^(photo:|credit:|image:|getty images|shutterstock|ap photo|reuters|afp)/i.test(text))
    return true;
  if (/^this (article|story) (is|was) (originally|first) published/i.test(text))
    return true;
  if (/cookie/i.test(text) && text.length < 100) return true;
  if (/newsletter/i.test(text) && text.length < 100) return true;
  if (text.split(" ").length < 6) return true;
  const alphaNum = text.replace(/[^a-zA-Z0-9\s]/g, "").length;
  if (alphaNum / text.length < 0.5) return true;
  return false;
}

function containsLooseUrl(text: string): boolean {
  const urlMatch = text.match(/https?:\/\/\S+/g);
  if (!urlMatch) return false;
  const urlLength = urlMatch.reduce((sum, u) => sum + u.length, 0);
  return urlLength / text.length > 0.5;
}

function tryJsonLd(html: string): ContentBlock[] | null {
  const scripts = html.match(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  );
  if (!scripts) return null;

  for (const script of scripts) {
    try {
      const jsonStr = script.replace(/<\/?script[^>]*>/gi, "");
      const data = JSON.parse(jsonStr);
      const obj = Array.isArray(data) ? data[0] : data;
      const body = obj?.articleBody;
      if (typeof body === "string" && body.length > 200) {
        return body
          .split(/\n\n|\n/)
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 30 && !isNoise(p) && !containsLooseUrl(p))
          .map((p: string) => ({
            type: "paragraph" as const,
            content: [{ type: "text" as const, text: p }],
          }));
      }
    } catch {
      // Invalid JSON, skip
    }
  }
  return null;
}

function tryReadability(html: string, url: string): ContentBlock[] | null {
  try {
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article?.textContent || article.textContent.length < 200 || !article.content) return null;

    const contentDom = new JSDOM(article.content);
    const doc = contentDom.window.document;
    const blocks: ContentBlock[] = [];
    const seenTexts = new Set<string>();

    const elements = doc.querySelectorAll("p, h2, h3, h4, blockquote, ul, ol");
    for (const el of elements) {
      const text = (el.textContent || "").replace(/\s+/g, " ").trim();
      const tag = el.tagName.toLowerCase();

      const key = text.slice(0, 80).toLowerCase();
      if (seenTexts.has(key)) continue;
      seenTexts.add(key);

      if (tag.startsWith("h")) {
        if (text.length > 5 && text.length < 200 && !isNoise(text)) {
          blocks.push({
            type: "heading",
            content: [{ type: "text", text }],
            attrs: { level: parseInt(tag[1]) },
          });
        }
      } else if (tag === "blockquote") {
        if (text.length > 20 && !isNoise(text) && !containsLooseUrl(text)) {
          blocks.push({
            type: "blockquote",
            content: [{ type: "text", text }],
          });
        }
      } else if (tag === "ul" || tag === "ol") {
        const items: string[] = [];
        const lis = el.querySelectorAll("li");
        for (const li of lis) {
          const liText = (li.textContent || "").replace(/\s+/g, " ").trim();
          if (liText.length > 10 && !isNoise(liText)) items.push(liText);
        }
        if (items.length >= 2) {
          blocks.push({ type: "list", content: [], items });
        }
      } else if (tag === "p") {
        if (!isNoise(text) && !containsLooseUrl(text)) {
          blocks.push({
            type: "paragraph",
            content: [{ type: "text", text }],
          });
        }
      }
    }

    const paragraphCount = blocks.filter((b) => b.type === "paragraph").length;
    if (paragraphCount >= 3) return blocks.slice(0, 40);

    return null;
  } catch {
    return null;
  }
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

    // Strategy 1: JSON-LD articleBody (most reliable when available)
    const jsonLdBlocks = tryJsonLd(html);
    if (jsonLdBlocks && jsonLdBlocks.length >= 3) {
      return jsonLdBlocks.slice(0, 40);
    }

    // Strategy 2: Mozilla Readability (good for most news sites)
    const readabilityBlocks = tryReadability(html, url);
    if (readabilityBlocks && readabilityBlocks.length >= 3) {
      return readabilityBlocks.slice(0, 40);
    }

    // Strategy 3: Regex HTML extraction with article body detection (fallback)
    const articleMatch =
      html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
      html.match(
        /<div[^>]+class="[^"]*(?:article-body|story-body|entry-content|post-content|article-content|ArticleBody|StoryBodyCompanionColumn|article__body|story__content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i
      ) ||
      html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

    const bodyHtml = articleMatch?.[1] || articleMatch?.[2] || html;
    const blocks: ContentBlock[] = [];

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
        if (text.length > 20 && !isNoise(text) && !containsLooseUrl(text)) {
          blocks.push({
            type: "blockquote",
            content: [{ type: "text", text }],
          });
        }
      } else if (tag === "ul" || tag === "ol") {
        const items: string[] = [];
        const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
        let liMatch;
        while ((liMatch = liRegex.exec(rawContent)) !== null) {
          const liText = decodeEntities(liMatch[1]);
          if (liText.length > 10 && !isNoise(liText)) items.push(liText);
        }
        if (items.length >= 2) {
          blocks.push({
            type: "list",
            content: [],
            items,
          });
        }
      } else if (tag === "p") {
        if (!isNoise(text) && !containsLooseUrl(text)) {
          blocks.push({
            type: "paragraph",
            content: [{ type: "text", text }],
          });
        }
      }
    }

    if (blocks.filter((b) => b.type === "paragraph").length >= 3) {
      return blocks.slice(0, 25);
    }

    return null;
  } catch {
    return null;
  }
}
