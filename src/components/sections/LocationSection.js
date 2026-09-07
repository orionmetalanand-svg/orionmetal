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
    <section className="relative overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[130px]" />

      <div className="section-padding container-wide relative">
        <SectionHeading
          eyebrow="Location"
          title="Based in Moorabbin. Serving Melbourne & Victoria."
          accentWord="Moorabbin"
          description="Our workshop is located in Moorabbin, Victoria — convenient for commercial and industrial clients across Melbourne's south-east and greater metropolitan area."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Map */}
          <Reveal className="lg:col-span-3">
            <div className="group relative h-full min-h-[18rem] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[22rem]">
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
                className="glass-strong absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:border-brand-red/50 sm:right-auto"
              >
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">
                    Open in Google Maps
                  </span>
                  <span className="mt-0.5 block text-xs text-white/80">
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
            <div className="glass flex h-full flex-col rounded-2xl p-7">
              <h3 className="text-xl font-bold text-white">Visit or Contact Us</h3>

              <div className="mt-6 space-y-5">
                {contactRows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/12 text-brand-red">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                        {row.icon}
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-faint">
                        {row.label}
                      </p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="mt-1 block text-sm font-semibold text-white transition-colors hover:text-brand-red"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-white/85">{row.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-faint">
                  Service Areas
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/65"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid gap-3">
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
