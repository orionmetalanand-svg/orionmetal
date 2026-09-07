import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  accentWord,
}) {
  const alignClass =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  const renderTitle = () => {
    if (!accentWord || typeof title !== "string") {
      return light ? title : <span className="gradient-white-text">{title}</span>;
    }
    const parts = title.split(accentWord);
    return (
      <>
        {light ? parts[0] : <span className="gradient-white-text">{parts[0]}</span>}
        <span className="text-brand-red">{accentWord}</span>
        {light ? parts[1] : <span className="gradient-white-text">{parts[1]}</span>}
      </>
    );
  };

  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignClass}`}>
      {eyebrow && (
        <div
          className={`mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] ${
            light
              ? "border border-brand-red/25 bg-brand-red/8 text-brand-red"
              : "glass-red text-brand-red-bright"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-glow-pulse" />
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.95rem] ${
          light ? "text-brand-black" : "text-white"
        }`}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            light ? "text-gray-600" : "text-brand-muted"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
