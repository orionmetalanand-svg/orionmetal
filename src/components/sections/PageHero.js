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
    <section className="relative isolate overflow-hidden bg-ink pb-14 pt-9 sm:pb-20 sm:pt-12 lg:pb-28 lg:pt-16">
      <div className="absolute inset-0 -z-10">
        {image && (
          <>
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              priority
              quality={78}
              className="object-cover opacity-[0.22]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/94 to-ink/55" />
          </>
        )}
        <div className="absolute inset-0 bg-grid opacity-90" />
        <div className="absolute inset-0 bg-radial-red" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute inset-0 bg-noise opacity-[0.04]" />
        <div className="absolute -left-32 -top-16 h-[340px] w-[340px] rounded-full bg-brand-red/[0.12] blur-[130px]" />
      </div>

      <div className="container-wide container-gutter">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-9 sm:mb-12">
            <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-brand-faint">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href || crumb.label} className="flex items-center gap-2.5">
                  {i > 0 && <span className="text-white/18">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-brand-red-bright">
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
            <div className="eyebrow-label text-brand-red-bright animate-fade-up">
              <span className="h-px w-7 bg-gradient-to-r from-brand-red to-brand-red/15" />
              {eyebrow}
            </div>
          )}

          <h1
            className="mt-5 text-[clamp(1.75rem,7.6vw,2.3rem)] font-extrabold leading-[1.06] sm:mt-6 sm:text-[3rem] lg:text-[3.85rem] animate-fade-up"
            style={{ animationDelay: "70ms" }}
          >
            {renderTitle()}
          </h1>

          {description && (
            <p
              className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-brand-muted sm:mt-7 sm:text-[17.5px] animate-fade-up"
              style={{ animationDelay: "140ms" }}
            >
              {description}
            </p>
          )}

          {primaryCta && (
            <div className="mt-9 animate-fade-up sm:mt-11" style={{ animationDelay: "210ms" }}>
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
