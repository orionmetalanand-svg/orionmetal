import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function ServiceCard({ service, index = 0, detailed = false }) {
  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="group hover-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-dark hover:-translate-y-1.5 hover:border-brand-red/40 hover:shadow-[0_28px_70px_-30px_rgba(225,29,46,0.6)]">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.name} — Orion Metal Industries Moorabbin`}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 32vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/35 to-transparent" />

          <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg glass text-[11px] font-bold text-white/90">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-red to-brand-red-bright transition-transform duration-500 group-hover:scale-x-100" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-brand-red-bright sm:text-xl">
            {service.name}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
            {detailed ? service.overview : service.shortDescription}
          </p>

          {detailed && (
            <ul className="mt-5 space-y-2">
              {service.applications.slice(0, 3).map((app) => (
                <li key={app} className="flex items-start gap-2.5 text-xs text-brand-faint">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                  {app}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/services#${service.id}`}
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red transition-colors hover:text-brand-red-bright"
          >
            Explore Service
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function ServiceGrid({ services: serviceList, detailed = false }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {serviceList.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} detailed={detailed} />
      ))}
    </div>
  );
}
