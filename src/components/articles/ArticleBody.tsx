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
            if (level === 2)
              return (
                <h2 key={i} className="font-[family-name:var(--font-headline)] text-2xl font-bold text-dark-text mt-8 mb-4">
                  {children}
                </h2>
              );
            if (level === 3)
              return (
                <h3 key={i} className="font-[family-name:var(--font-headline)] text-xl font-bold text-dark-text mt-6 mb-3">
                  {children}
                </h3>
              );
            return (
              <h4 key={i} className="font-[family-name:var(--font-headline)] text-lg font-semibold text-dark-text mt-4 mb-2">
                {children}
              </h4>
            );
          }

          if (block.type === "blockquote" && block.content) {
            return (
              <blockquote
                key={i}
                className="border-l-4 border-red-accent pl-6 py-2 my-6 italic text-medium-gray bg-off-white rounded-r-lg"
              >
                {block.content.map((inline: any, j: number) =>
                  inline.type === "text" ? (
                    <p key={j} className="text-lg leading-relaxed">
                      {inline.text}
                    </p>
                  ) : null
                )}
              </blockquote>
            );
          }

          if (block.type === "list" && block.items) {
            return (
              <ul key={i} className="list-disc pl-6 my-4 space-y-2">
                {block.items.map((item: string, j: number) => (
                  <li key={j} className="text-dark-text leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );
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
