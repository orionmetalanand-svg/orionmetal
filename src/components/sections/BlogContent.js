function parseBlocks(content) {
  if (!content) return [];

  return content
    .split("\n\n")
    .map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("## ")) {
        return { type: "h2", text: trimmed.replace(/^## /, ""), key: index };
      }

      if (trimmed.startsWith("### ")) {
        return { type: "h3", text: trimmed.replace(/^### /, ""), key: index };
      }

      if (trimmed.startsWith("- ")) {
        return {
          type: "ul",
          items: trimmed.split("\n").map((line) => line.replace(/^- /, "").trim()),
          key: index,
        };
      }

      return { type: "p", text: trimmed, key: index };
    })
    .filter(Boolean);
}

/** Renders **bold** inline markdown safely as React nodes. */
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-brand-black">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogContent({ content }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-5">
      {blocks.map((block) => {
        if (block.type === "h2") {
          return (
            <h2
              key={block.key}
              className="scroll-mt-24 pt-6 text-2xl font-bold leading-snug text-brand-black sm:text-[1.7rem]"
            >
              <span className="mr-3 inline-block h-6 w-1 translate-y-0.5 rounded-full bg-brand-red align-middle" />
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3 key={block.key} className="pt-4 text-xl font-bold text-brand-black">
              {block.text}
            </h3>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={block.key} className="space-y-2.5">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={block.key} className="text-[15px] leading-[1.8] text-gray-600 sm:text-base">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
