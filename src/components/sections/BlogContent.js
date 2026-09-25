import Image from "next/image";
import Link from "next/link";

const IMAGE_BLOCK = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function parseBlocks(content) {
  if (!content) return [];

  return content
    .split("\n\n")
    .map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      const imageMatch = trimmed.match(IMAGE_BLOCK);
      if (imageMatch) {
        return {
          type: "img",
          alt: imageMatch[1],
          src: imageMatch[2],
          key: index,
        };
      }

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

function renderInline(text) {
  const tokens = [];
  const regex = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    if (match[0].startsWith("**")) {
      tokens.push(
        <strong key={`${match.index}-b`} className="font-bold text-ink">
          {match[0].slice(2, -2)}
        </strong>
      );
    } else {
      const href = match[3];
      const label = match[2];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        tokens.push(
          <Link
            key={`${match.index}-l`}
            href={href}
            className="font-semibold text-brand-red underline decoration-brand-red/30 underline-offset-2 hover:decoration-brand-red"
          >
            {label}
          </Link>
        );
      } else {
        tokens.push(
          <a
            key={`${match.index}-a`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-red underline decoration-brand-red/30 underline-offset-2 hover:decoration-brand-red"
          >
            {label}
          </a>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens.length ? tokens : text;
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
              className="scroll-mt-24 pt-6 text-[1.4rem] font-extrabold leading-snug text-ink sm:text-[1.7rem]"
            >
              <span className="mr-3 inline-block h-6 w-1 translate-y-0.5 rounded-full bg-brand-red align-middle" />
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3 key={block.key} className="pt-4 text-[18px] font-bold text-ink sm:text-xl">
              {block.text}
            </h3>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={block.key} className="space-y-2.5">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-4/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "img") {
          return (
            <figure
              key={block.key}
              className="relative my-8 overflow-hidden rounded-2xl border border-black/8 bg-ink-2/5"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={block.src}
                  alt={block.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              {block.alt ? (
                <figcaption className="border-t border-black/6 px-4 py-3 text-[12.5px] leading-relaxed text-ink-4/55">
                  {block.alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        return (
          <p key={block.key} className="text-[15px] leading-[1.8] text-ink-4/70 sm:text-base">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
