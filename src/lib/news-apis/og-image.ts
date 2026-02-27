function upscaleBbcImage(imageUrl: string): string {
  // BBC uses /cpsprodpb/ URLs with size params like /240/ or /480/
  if (imageUrl.includes(".bbc.co.uk") || imageUrl.includes(".bbci.co.uk")) {
    return imageUrl
      .replace(/\/\d{2,3}x\d{2,3}\//, "/1024x576/")
      .replace(/\/240\//, "/1024/")
      .replace(/\/480\//, "/1024/")
      .replace(/\/640\//, "/1024/")
      .replace(/\/800\//, "/1024/");
  }
  return imageUrl;
}

function isPlaceholderImage(imageUrl: string): boolean {
  const lower = imageUrl.toLowerCase();
  return (
    lower.includes("placeholder") ||
    lower.includes("default-avatar") ||
    lower.includes("/avatar") ||
    lower.includes("spacer.gif") ||
    lower.includes("pixel.gif") ||
    lower.includes("blank.png")
  );
}

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
    let imageUrl: string | null = null;

    const ogMatch = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogMatch?.[1]) imageUrl = ogMatch[1];

    // Try reverse order (content before property)
    if (!imageUrl) {
      const ogMatch2 = html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
      );
      if (ogMatch2?.[1]) imageUrl = ogMatch2[1];
    }

    // Fallback: twitter:image
    if (!imageUrl) {
      const twMatch = html.match(
        /<meta[^>]+(?:name|property)=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
      );
      if (twMatch?.[1]) imageUrl = twMatch[1];
    }

    if (!imageUrl) {
      const twMatch2 = html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']twitter:image["']/i
      );
      if (twMatch2?.[1]) imageUrl = twMatch2[1];
    }

    if (!imageUrl) return null;

    // Filter out placeholder images
    if (isPlaceholderImage(imageUrl)) return null;

    // Upscale BBC images
    imageUrl = upscaleBbcImage(imageUrl);

    return imageUrl;
  } catch {
    return null;
  }
}
