export function renderBlogContent(content) {
  if (!content) return [];

  return content.split("\n\n").map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return { type: "h2", text: trimmed.replace(/^## /, ""), key: index };
    }

    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
      return { type: "ul", items, key: index };
    }

    return { type: "p", text: trimmed, key: index };
  }).filter(Boolean);
}

export default function BlogContent({ content }) {
  const blocks = renderBlogContent(content);

  return (
    <div className="prose-custom space-y-4">
      {blocks.map((block) => {
        if (block.type === "h2") {
          return (
            <h2 key={block.key} className="mt-8 text-2xl font-bold text-brand-black">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={block.key} className="ml-4 list-disc space-y-2 text-gray-600">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={block.key} className="text-gray-600 leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
