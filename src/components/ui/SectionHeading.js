import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  accentWord,
}) {
  const centered = align === "center";

  const renderTitle = () => {
    if (!accentWord || typeof title !== "string") {
      return light ? title : <span className="gradient-white-text">{title}</span>;
    }
    const [before, after] = title.split(accentWord);
    const Neutral = ({ children }) =>
      light ? <>{children}</> : <span className="gradient-white-text">{children}</span>;
    return (
      <>
        <Neutral>{before}</Neutral>
        <span className="text-brand-red">{accentWord}</span>
        <Neutral>{after}</Neutral>
      </>
    );
  };

  return (
    <Reveal
      className={`flex max-w-3xl flex-col ${
        centered ? "mx-auto items-center text-center" : "items-start"
      }`}
    >
      {eyebrow && (
        <div
          className={`eyebrow-label mb-6 ${
            light ? "text-brand-red-dark" : "text-brand-red-bright"
          }`}
        >
          <span
            className={`h-px w-7 ${
              light
                ? "bg-gradient-to-r from-brand-red/70 to-brand-red/10"
                : "bg-gradient-to-r from-brand-red to-brand-red/15"
            }`}
          />
          {eyebrow}
          {centered && (
            <span
              className={`h-px w-7 ${
                light
                  ? "bg-gradient-to-l from-brand-red/70 to-brand-red/10"
                  : "bg-gradient-to-l from-brand-red to-brand-red/15"
              }`}
            />
          )}
        </div>
      )}

      <h2
        className={`text-[1.75rem] font-extrabold leading-[1.08] sm:text-[2.35rem] lg:text-[3rem] ${
          light ? "text-ink" : "text-white"
        }`}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p
          className={`mt-6 max-w-2xl text-[15px] leading-[1.75] sm:text-[17px] ${
            light ? "text-ink-4/75" : "text-brand-muted"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
