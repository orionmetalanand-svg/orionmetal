import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import { company } from "@/data/company";

export default function CTASection({
  title = "Ready to Start Your Project?",
  description = "Send your drawings or specifications and our team will respond with a quote for your fabrication requirements.",
  primaryLabel = "Request a Quote",
  primaryHref = "/contact",
}) {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute left-1/2 top-0 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-brand-red/18 blur-[150px]" />

      <div className="section-padding container-wide relative">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 lg:px-16 lg:py-20">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />

            <span className="glass-red inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-glow-pulse" />
              Get Started
            </span>

            <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.1rem]">
              <span className="gradient-white-text">{title}</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                href={primaryHref}
                variant="primary"
                size="lg"
                external={primaryHref.startsWith("http")}
              >
                {primaryLabel}
              </Button>
              <Button href={getWhatsAppUrl()} variant="secondary" size="lg" external>
                WhatsApp Us
              </Button>
              <Button href={getTelUrl()} variant="ghost" size="lg" external icon={false}>
                Call {company.phoneDisplay}
              </Button>
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-brand-faint">
              Upload PDF · DWG · DXF · STEP · JPG · PNG · ZIP
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
