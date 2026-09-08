import Image from "next/image";
import Button from "@/components/ui/Button";
import HeroVisualWrapper from "@/components/sections/HeroVisualWrapper";
import { company } from "@/data/company";
import { stock } from "@/config/images";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";

const capabilityChips = [
  "Laser Cutting",
  "Bending",
  "Fabrication",
  "Powder Coating",
  "Assembly",
];

const proofPoints = [
  { label: "Moorabbin", detail: "Melbourne facility" },
  { label: "Commercial", detail: "& industrial clients" },
  { label: "In-house", detail: "coating & assembly" },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden bg-ink sm:min-h-[90vh]">
      {/* Background stack */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={stock.laserSparks.src}
          alt={stock.laserSparks.alt}
          fill
          priority
          quality={82}
          className="object-cover opacity-[0.28]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/94 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80" />
        <div className="absolute inset-0 bg-grid opacity-90" />
        <div className="absolute inset-0 bg-radial-red" />
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-noise opacity-[0.04]" />
        <div className="absolute -left-40 top-1/4 h-[340px] w-[340px] rounded-full bg-brand-red/[0.14] blur-[130px] animate-glow-pulse sm:h-[460px] sm:w-[460px]" />
      </div>

      <HeroVisualWrapper />

      <div className="container-wide container-gutter relative w-full py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Location badge */}
          <div
            className="glass inline-flex max-w-full items-center gap-3 rounded-full py-2 pl-3 pr-4 animate-fade-up sm:pl-3.5 sm:pr-5"
            style={{ animationDelay: "40ms" }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red" />
            </span>
            <span className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-[11px]">
              {company.address.suburb} · Melbourne · Victoria
            </span>
          </div>

          <h1
            className="mt-7 text-[clamp(1.95rem,8.6vw,2.6rem)] font-extrabold leading-[1.03] text-white animate-fade-up sm:mt-9 sm:text-[3.4rem] md:text-[4rem] lg:text-[4.6rem]"
            style={{ animationDelay: "110ms" }}
          >
            <span className="gradient-white-text">Precision Sheet Metal</span>
            <br />
            <span className="gradient-white-text">Fabrication. Built for</span>{" "}
            <span className="relative inline-block text-brand-red text-glow-red">
              Industry.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-brand-red to-transparent sm:-bottom-2" />
            </span>
          </h1>

          <p
            className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-brand-muted animate-fade-up sm:mt-8 sm:text-[17.5px]"
            style={{ animationDelay: "180ms" }}
          >
            {company.hero.subtitle}
          </p>

          {/* CTAs */}
          <div
            className="mt-9 flex flex-col gap-3 animate-fade-up sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={{ animationDelay: "250ms" }}
          >
            <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
              Request a Quote
            </Button>
            <Button
              href={getWhatsAppUrl()}
              variant="secondary"
              size="lg"
              external
              icon={false}
              className="w-full sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884" />
              </svg>
              WhatsApp Us
            </Button>
            <a
              href={getTelUrl()}
              className="group inline-flex items-center justify-center gap-3 rounded-full py-2 text-sm font-semibold text-white/65 transition-colors hover:text-white sm:justify-start sm:pl-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 transition-all duration-300 group-hover:border-brand-red/60 group-hover:bg-brand-red/10 group-hover:text-brand-red-bright">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              {company.phoneDisplay}
            </a>
          </div>

          {/* Capability chips */}
          <div
            className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 animate-fade-up sm:mx-0 sm:mt-12 sm:flex-wrap sm:overflow-visible sm:px-0"
            style={{ animationDelay: "320ms" }}
          >
            {capabilityChips.map((chip) => (
              <span
                key={chip}
                className="glass shrink-0 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/65"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Proof strip */}
          <dl
            className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/[0.08] pt-7 animate-fade-up sm:mt-12 sm:gap-6"
            style={{ animationDelay: "390ms" }}
          >
            {proofPoints.map((point) => (
              <div key={point.label}>
                <dt className="text-[13px] font-bold leading-tight text-white sm:text-[15px]">
                  {point.label}
                </dt>
                <dd className="mt-1 text-[10.5px] leading-snug text-brand-faint sm:text-[11.5px]">
                  {point.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="relative h-14 w-[22px] overflow-hidden rounded-full border border-white/12">
          <span className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-brand-red to-transparent animate-scan" />
        </div>
      </div>
    </section>
  );
}
