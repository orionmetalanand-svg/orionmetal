import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

function CustomerPlate({ customer }) {
  const inner = (
    <div className="glass hover-lift flex h-[5.5rem] w-44 shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl px-4 text-center hover:border-white/18 hover:bg-white/[0.07] sm:h-24 sm:w-56 sm:px-5">
      {customer.logoUrl ? (
        <Image
          src={customer.logoUrl}
          alt={`${customer.name} logo`}
          width={140}
          height={44}
          className="max-h-10 w-auto object-contain opacity-85 transition-opacity duration-300 hover:opacity-100 sm:max-h-11"
        />
      ) : (
        <span className="text-[13px] font-bold leading-tight text-white/90 sm:text-sm">
          {customer.name}
        </span>
      )}
      {customer.industry && (
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-faint sm:text-[10px]">
          {customer.industry}
        </span>
      )}
    </div>
  );

  if (customer.websiteUrl) {
    return (
      <a
        href={customer.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${customer.name} website`}
        className="shrink-0"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

export default function TrustedCustomers({ customers }) {
  if (!customers?.length) return null;

  const loop = [...customers, ...customers];

  return (
    <section className="relative overflow-hidden bg-ink-2 py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute left-1/2 top-0 h-64 w-[620px] -translate-x-1/2 rounded-full bg-brand-red/[0.09] blur-[130px]" />

      <div className="container-wide container-gutter relative">
        <SectionHeading
          eyebrow="Trusted By"
          title="Working With Commercial & Industrial Clients"
          accentWord="Industrial"
          description="Client names shown are placeholders for layout purposes. Real logos and links can be added in Supabase at any time."
          align="center"
        />
      </div>

      {/* Counter-scrolling marquees */}
      <div className="mask-fade-x relative mt-12 overflow-hidden sm:mt-16">
        <div className="marquee-track flex w-max gap-3.5 animate-marquee sm:gap-4">
          {loop.map((customer, i) => (
            <CustomerPlate key={`${customer.id}-${i}`} customer={customer} />
          ))}
        </div>
      </div>

      <div className="mask-fade-x relative mt-3.5 overflow-hidden sm:mt-4">
        <div
          className="marquee-track flex w-max gap-3.5 animate-marquee-slow sm:gap-4"
          style={{ animationDirection: "reverse" }}
        >
          {loop.map((customer, i) => (
            <CustomerPlate key={`rev-${customer.id}-${i}`} customer={customer} />
          ))}
        </div>
      </div>

      <Reveal className="container-wide container-gutter mt-12 text-center sm:mt-16">
        <div className="mx-auto max-w-md">
          <div className="hairline-x" />
          <p className="mt-5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-brand-faint sm:text-[11px]">
            Commercial · Industrial · Manufacturing · Construction · Engineering
          </p>
        </div>
      </Reveal>
    </section>
  );
}
