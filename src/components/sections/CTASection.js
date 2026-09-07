import Button from "@/components/ui/Button";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import { company } from "@/data/company";

export default function CTASection({
  title = "Ready to Start Your Project?",
  description = "Send us your drawings or specifications and our team will respond with a quote for your fabrication requirements.",
  primaryLabel = "Request a Quote",
  primaryHref = "/contact",
}) {
  return (
    <section className="relative overflow-hidden bg-brand-red">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:60px_60px]" />
      </div>
      <div className="section-padding container-wide relative text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={primaryHref} variant="white" size="lg">
            {primaryLabel}
          </Button>
          <Button href={getWhatsAppUrl()} variant="secondary" size="lg" external>
            WhatsApp Us
          </Button>
          <Button href={getTelUrl()} variant="secondary" size="lg" external>
            Call {company.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
}
