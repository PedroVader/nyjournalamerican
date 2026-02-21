interface ArticleBodyProps {
  content: any;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  if (!content) return null;

  // Handle JSON content from the CMS/API
  if (typeof content === "object" && content.content) {
    return (
      <div className="article-content prose prose-lg max-w-none">
        {content.content.map((block: any, i: number) => {
          if (block.type === "paragraph" && block.content) {
            return (
              <p key={i}>
                {block.content.map((inline: any, j: number) => {
                  if (inline.type === "text") {
                    return <span key={j}>{inline.text}</span>;
                  }
                  return null;
                })}
              </p>
            );
          }
          if (block.type === "heading" && block.content) {
            const level = block.attrs?.level || 2;
            const children = block.content.map((inline: any, j: number) =>
              inline.type === "text" ? <span key={j}>{inline.text}</span> : null
            );
            if (level === 1) return <h1 key={i} className="font-[family-name:var(--font-headline)]">{children}</h1>;
            if (level === 3) return <h3 key={i} className="font-[family-name:var(--font-headline)]">{children}</h3>;
            return <h2 key={i} className="font-[family-name:var(--font-headline)]">{children}</h2>;
          }
          return null;
        })}
      </div>
    );
  }

  // Fallback for string content
  if (typeof content === "string") {
    return (
      <div
        className="article-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return null;
}
