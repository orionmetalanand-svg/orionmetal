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

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-brand-black sm:min-h-[92vh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={stock.laserSparks.src}
          alt={stock.laserSparks.alt}
          fill
          priority
          quality={80}
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/92 to-brand-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/70" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-radial-red" />
        <div className="absolute -left-40 top-1/4 h-[320px] w-[320px] rounded-full bg-brand-red/18 blur-[110px] animate-glow-pulse sm:h-[420px] sm:w-[420px]" />
      </div>

      <HeroVisualWrapper />

      <div className="section-padding container-wide relative w-full !py-16 sm:!py-20 lg:!py-24">
        <div className="max-w-2xl">
          <div className="glass inline-flex max-w-full items-center gap-2.5 rounded-full px-3.5 py-2 animate-fade-up sm:gap-3 sm:px-4">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
            </span>
            <span className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 sm:text-[11px] sm:tracking-[0.2em]">
              {company.address.suburb} · Melbourne · Victoria
            </span>
          </div>

          <h1
            className="mt-6 text-[2.15rem] font-bold leading-[1.05] tracking-tight text-white animate-fade-up sm:mt-8 sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="gradient-white-text">Precision Sheet Metal</span>
            <br />
            <span className="gradient-white-text">Fabrication. Built for</span>{" "}
            <span className="text-brand-red text-glow-red">Industry.</span>
          </h1>

          <p
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-brand-muted animate-fade-up sm:mt-7 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {company.hero.subtitle}
          </p>

          <div
            className="mt-8 flex flex-col gap-3 animate-fade-up sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={{ animationDelay: "240ms" }}
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
              className="group inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white/70 transition-colors hover:text-white sm:justify-start sm:py-3.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-brand-red group-hover:text-brand-red">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              {company.phoneDisplay}
            </a>
          </div>

          <div
            className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1 animate-fade-up sm:mt-12 sm:flex-wrap sm:overflow-visible"
            style={{ animationDelay: "320ms" }}
          >
            {capabilityChips.map((chip) => (
              <span
                key={chip}
                className="glass shrink-0 rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[11px] sm:tracking-[0.14em]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="relative h-14 w-6 overflow-hidden rounded-full border border-white/15">
          <span className="absolute left-1/2 top-0 h-6 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-red to-transparent animate-scan" />
        </div>
      </div>
    </section>
  );
}
