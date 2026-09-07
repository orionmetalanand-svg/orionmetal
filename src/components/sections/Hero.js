import Image from "next/image";
import Button from "@/components/ui/Button";
import HeroVisualWrapper from "@/components/sections/HeroVisualWrapper";
import { company } from "@/data/company";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-brand-black">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/powder-coating-facility-hero.jpeg"
          alt="Orion Metal Industries powder coating and fabrication facility"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
      </div>

      <HeroVisualWrapper />

      <div className="section-padding container-wide relative flex min-h-[85vh] items-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            {company.tagline}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {company.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted sm:text-xl">
            {company.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button href={getWhatsAppUrl()} variant="secondary" size="lg" external>
              Talk to Us on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
