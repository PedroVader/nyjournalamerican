export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "NewYorkJournalAmerican/1.0 (compatible; bot)",
        Accept: "text/html",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    // Only read first 50KB to find og:image in <head>
    const reader = res.body?.getReader();
    if (!reader) return null;

    let html = "";
    const decoder = new TextDecoder();

    while (html.length < 50000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });

      // Stop early if we've passed </head>
      if (html.includes("</head>")) break;
    }

    reader.cancel().catch(() => {});

    // Match og:image
    const ogMatch = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogMatch?.[1]) return ogMatch[1];

    // Try reverse order (content before property)
    const ogMatch2 = html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
    );
    if (ogMatch2?.[1]) return ogMatch2[1];

    // Fallback: twitter:image
    const twMatch = html.match(
      /<meta[^>]+(?:name|property)=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (twMatch?.[1]) return twMatch[1];

    const twMatch2 = html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']twitter:image["']/i
    );
    if (twMatch2?.[1]) return twMatch2[1];

    return null;
  } catch {
    return null;
  }
}
