import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

function CustomerPlate({ customer }) {
  const inner = (
    <div className="glass hover-lift flex h-24 w-56 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl px-5 text-center hover:border-brand-red/40 hover:bg-white/10">
      {customer.logoUrl ? (
        <Image
          src={customer.logoUrl}
          alt={`${customer.name} logo`}
          width={140}
          height={44}
          className="max-h-11 w-auto object-contain"
        />
      ) : (
        <span className="text-sm font-bold leading-tight text-white/90">
          {customer.name}
        </span>
      )}
      {customer.industry && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-faint">
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
    <section className="relative overflow-hidden border-y border-white/5 bg-brand-dark py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand-red/10 blur-[120px]" />

      <div className="container-wide relative px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trusted By"
          title="Working With Commercial & Industrial Clients"
          accentWord="Industrial"
          description="Client names shown are placeholders for layout purposes. Real logos and links can be added in Supabase at any time."
          align="center"
        />
      </div>

      {/* Infinite marquee */}
      <div className="mask-fade-x relative mt-12 overflow-hidden">
        <div className="marquee-track flex w-max gap-4 animate-marquee">
          {loop.map((customer, i) => (
            <CustomerPlate key={`${customer.id}-${i}`} customer={customer} />
          ))}
        </div>
      </div>

      <div className="mask-fade-x relative mt-4 overflow-hidden">
        <div
          className="marquee-track flex w-max gap-4 animate-marquee-slow"
          style={{ animationDirection: "reverse" }}
        >
          {loop.map((customer, i) => (
            <CustomerPlate key={`rev-${customer.id}-${i}`} customer={customer} />
          ))}
        </div>
      </div>

      <Reveal className="container-wide mt-12 px-5 text-center sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-faint">
          Commercial · Industrial · Manufacturing · Construction · Engineering
        </p>
      </Reveal>
    </section>
  );
}
