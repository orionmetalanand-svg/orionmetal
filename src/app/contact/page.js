import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { getPageMetadata } from "@/data/seo";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("contact");

const quickActions = [
  {
    label: "WhatsApp",
    detail: "Fastest response",
    href: getWhatsAppUrl(),
    external: true,
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884" />
    ),
    filled: true,
  },
  {
    label: "Call Us",
    detail: company.phoneDisplay,
    href: getTelUrl(),
    external: true,
    icon: (
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    label: "Find Us",
    detail: `${company.address.suburb} ${company.address.state}`,
    href: company.location.mapUrl,
    external: true,
    icon: (
      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title="Request a Quote"
        accentWord="Quote"
        description="Send your enquiry with drawings or specifications. We respond to all commercial and industrial fabrication enquiries."
        image="/images/services/metal-fabrication-assembly.jpeg"
        imageAlt="Custom metal fabrication and assembly workshop"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Quick actions */}
      <section className="relative border-y border-white/5 bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-wide relative grid gap-4 px-5 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {quickActions.map((action, i) => (
            <Reveal key={action.label} delay={i * 80}>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={`hover-lift flex items-center gap-4 rounded-2xl p-5 hover:-translate-y-1 ${
                  action.filled ? "glass-red hover:border-brand-red/60" : "glass hover:border-brand-red/40"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    action.filled ? "bg-brand-red text-white" : "bg-brand-red/15 text-brand-red"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill={action.filled ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke={action.filled ? "none" : "currentColor"}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {action.icon}
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">{action.label}</span>
                  <span className="mt-0.5 block text-xs text-brand-muted">{action.detail}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + details */}
      <section className="relative overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-red/12 blur-[150px]" />

        <div className="section-padding container-wide relative grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <Reveal>
              <div className="glass rounded-2xl p-7">
                <h2 className="text-xl font-bold text-white">Contact Details</h2>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">
                      Company
                    </dt>
                    <dd className="mt-1.5 text-sm text-white/85">{company.name}</dd>
                  </div>

                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">
                      Address
                    </dt>
                    <dd className="mt-1.5">
                      <address className="not-italic text-sm leading-relaxed text-white/85">
                        {company.address.street}
                        <br />
                        {company.address.suburb} {company.address.state}{" "}
                        {company.address.postcode}
                        <br />
                        {company.address.country}
                      </address>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">
                      Phone
                    </dt>
                    <dd className="mt-1.5">
                      <a
                        href={getTelUrl()}
                        className="text-sm font-bold text-white transition-colors hover:text-brand-red"
                      >
                        {company.phone}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">
                      Contact Person
                    </dt>
                    <dd className="mt-1.5 text-sm text-white/85">{company.contactPerson}</dd>
                  </div>
                </dl>

                <div className="mt-7 grid gap-3 border-t border-white/10 pt-6">
                  <Button href={getWhatsAppUrl()} variant="primary" size="sm" external className="w-full">
                    WhatsApp Us
                  </Button>
                  <Button href={getTelUrl()} variant="secondary" size="sm" external className="w-full">
                    Call {company.phoneDisplay}
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="group relative min-h-[18rem] overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={company.location.embedUrl}
                  title={`${company.name} location — Moorabbin VIC 3189`}
                  className="absolute inset-0 h-full w-full grayscale-[0.85] contrast-[1.15] transition-all duration-700 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red">
                  Accepted File Types
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["PDF", "DWG", "DXF", "STEP", "JPG", "PNG", "ZIP"].map((ext) => (
                    <span
                      key={ext}
                      className="rounded-lg border border-white/12 bg-white/[0.03] px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-white/70"
                    >
                      {ext}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-brand-muted">
                  Attach up to 5 files, 10MB each. Include material, thickness, quantity and finish
                  requirements for the most accurate quote.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
