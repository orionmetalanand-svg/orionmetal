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
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-grid opacity-80" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-brand-red/[0.13] blur-[150px]" />

      <div className="section-padding container-wide relative">
        <Reveal>
          <div className="bg-steel relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] px-6 py-14 text-center shadow-lift sm:rounded-[2rem] sm:px-12 sm:py-18 lg:px-20 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
            <div className="absolute inset-0 bg-noise opacity-[0.05]" />
            <div className="absolute -bottom-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-brand-red/[0.09] blur-[110px]" />

            <div className="relative">
              <div className="eyebrow-label justify-center text-brand-red-bright">
                <span className="h-px w-7 bg-gradient-to-r from-brand-red to-brand-red/15" />
                Get Started
                <span className="h-px w-7 bg-gradient-to-l from-brand-red to-brand-red/15" />
              </div>

              <h2 className="mx-auto mt-7 max-w-3xl text-[1.85rem] font-extrabold leading-[1.08] sm:text-[2.6rem] lg:text-[3.2rem]">
                <span className="gradient-white-text">{title}</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.75] text-brand-muted sm:text-[17.5px]">
                {description}
              </p>

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                <Button
                  href={primaryHref}
                  variant="primary"
                  size="lg"
                  external={primaryHref.startsWith("http")}
                  className="w-full sm:w-auto"
                >
                  {primaryLabel}
                </Button>
                <Button
                  href={getWhatsAppUrl()}
                  variant="secondary"
                  size="lg"
                  external
                  className="w-full sm:w-auto"
                >
                  WhatsApp Us
                </Button>
                <Button
                  href={getTelUrl()}
                  variant="ghost"
                  size="lg"
                  external
                  icon={false}
                  className="w-full sm:w-auto"
                >
                  Call {company.phoneDisplay}
                </Button>
              </div>

              <div className="mx-auto mt-10 max-w-md">
                <div className="hairline-x" />
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-faint sm:text-[11px]">
                  Upload PDF · DWG · DXF · STEP · JPG · PNG · ZIP
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
