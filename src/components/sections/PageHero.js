import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function PageHero({
  eyebrow,
  title,
  accentWord,
  description,
  image,
  imageAlt,
  breadcrumbs = [],
  primaryCta,
}) {
  const renderTitle = () => {
    if (!accentWord || typeof title !== "string") {
      return <span className="gradient-white-text">{title}</span>;
    }
    const [before, after] = title.split(accentWord);
    return (
      <>
        <span className="gradient-white-text">{before}</span>
        <span className="text-brand-red text-glow-red">{accentWord}</span>
        <span className="gradient-white-text">{after}</span>
      </>
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-brand-black pt-14 pb-16 lg:pt-20 lg:pb-24">
      <div className="absolute inset-0 -z-10">
        {image && (
          <>
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              priority
              quality={75}
              className="object-cover opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/92 to-brand-black/60" />
          </>
        )}
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-radial-red" />
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-brand-red/14 blur-[120px] animate-glow-pulse" />
      </div>

      <div className="container-wide px-5 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-brand-faint">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href || crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/20">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-brand-red">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <div className="glass-red inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red-bright animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-glow-pulse" />
              {eyebrow}
            </div>
          )}

          <h1
            className="mt-6 text-[2.25rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem] animate-fade-up"
            style={{ animationDelay: "70ms" }}
          >
            {renderTitle()}
          </h1>

          {description && (
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg animate-fade-up"
              style={{ animationDelay: "140ms" }}
            >
              {description}
            </p>
          )}

          {primaryCta && (
            <div className="mt-9 animate-fade-up" style={{ animationDelay: "210ms" }}>
              <Button href={primaryCta.href} variant="primary" size="lg">
                {primaryCta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
