export async function scrapeArticleContent(
  url: string
): Promise<string[] | null> {
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

    // Try to find article body using common selectors via regex
    // Look for <article>, [class*="article-body"], [class*="story-body"], etc.
    const articleMatch =
      html.match(
        /<article[^>]*>([\s\S]*?)<\/article>/i
      ) ||
      html.match(
        /<div[^>]+class="[^"]*(?:article-body|story-body|entry-content|post-content|article-content|ArticleBody|StoryBodyCompanionColumn)[^"]*"[^>]*>([\s\S]*?)<\/div>/i
      );

    const bodyHtml = articleMatch?.[1] || html;

    // Extract all <p> tags content
    const paragraphs: string[] = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;

    while ((match = pRegex.exec(bodyHtml)) !== null) {
      // Strip HTML tags from paragraph content
      let text = match[1]
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      // Filter out short lines, navigation text, ads, etc.
      if (
        text.length > 40 &&
        !text.startsWith("Advertisement") &&
        !text.startsWith("Subscribe") &&
        !text.startsWith("Sign up") &&
        !text.startsWith("Read more") &&
        !text.startsWith("Copyright") &&
        !text.includes("cookie") &&
        !text.includes("newsletter")
      ) {
        paragraphs.push(text);
      }
    }

    // Return paragraphs if we found meaningful content (at least 3 paragraphs)
    if (paragraphs.length >= 3) {
      return paragraphs.slice(0, 15); // Cap at 15 paragraphs
    }

    return null;
  } catch {
    return null;
  }
}
