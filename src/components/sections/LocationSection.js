import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";

const serviceAreas = [
  "Moorabbin",
  "Cheltenham",
  "Braeside",
  "Clayton",
  "Dandenong",
  "Bayside",
  "South East Melbourne",
  "Greater Melbourne",
  "Victoria",
];

const contactRows = [
  {
    label: "Workshop",
    value: company.address.full,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
  {
    label: "Phone",
    value: company.phone,
    href: getTelUrl(),
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
  {
    label: "Contact",
    value: company.contactPerson,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
  },
];

export default function LocationSection() {
  return (
    <section className="relative overflow-hidden bg-ink-2">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-red/[0.08] blur-[140px]" />

      <div className="section-padding container-wide relative">
        <SectionHeading
          eyebrow="Location"
          title="Based in Moorabbin. Serving Melbourne & Victoria."
          accentWord="Moorabbin"
          description="Our workshop is located in Moorabbin, Victoria — convenient for commercial and industrial clients across Melbourne's south-east and greater metropolitan area."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-5 lg:gap-6">
          {/* Map */}
          <Reveal className="lg:col-span-3">
            <div className="group relative h-full min-h-[17rem] overflow-hidden rounded-3xl border border-white/[0.09] shadow-lift sm:min-h-[23rem]">
              <iframe
                src={company.location.embedUrl}
                title={`${company.name} location — Moorabbin VIC 3189`}
                className="absolute inset-0 h-full w-full grayscale-[0.85] contrast-[1.15] transition-all duration-700 group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              <a
                href={company.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 transition-colors duration-300 hover:border-brand-red/50 sm:bottom-5 sm:left-5 sm:right-auto sm:px-5"
              >
                <span>
                  <span className="block text-[9.5px] font-bold uppercase tracking-[0.2em] text-brand-red-bright">
                    Open in Google Maps
                  </span>
                  <span className="mt-1 block text-[12.5px] text-white/80">
                    {company.address.street}, {company.address.suburb} {company.address.state}{" "}
                    {company.address.postcode}
                  </span>
                </span>
                <svg className="h-4 w-4 shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="panel relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-8">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

              <h3 className="text-lg font-bold text-white sm:text-xl">Visit or Contact Us</h3>

              <div className="mt-7 space-y-5">
                {contactRows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-red/20 bg-brand-red/10 text-brand-red-bright">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                        {row.icon}
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-brand-faint">
                        {row.label}
                      </p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="mt-1.5 block text-[13.5px] font-semibold text-white transition-colors hover:text-brand-red-bright"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/85">{row.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/[0.07] pt-6">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-brand-faint">
                  Service Areas
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/65"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <Button href="/contact" variant="primary" size="md" className="w-full">
                  Request a Quote
                </Button>
                <Button href={getWhatsAppUrl()} variant="secondary" size="md" external className="w-full">
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
