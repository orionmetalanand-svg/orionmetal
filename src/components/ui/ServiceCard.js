import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { getMaterialPreviewNames } from "./ServiceMaterialsPanel";

export default function ServiceCard({ service, index = 0, detailed = false }) {
  const materialPreview = detailed ? getMaterialPreviewNames(service.materialsSection, 5) : [];

  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="panel hover-lift group relative flex h-full flex-col overflow-hidden rounded-2xl hover:-translate-y-1.5 hover:border-white/15 hover:shadow-lift">
        {/* Top light edge — reads as machined metal, not a flat div */}
        <span className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.name} — Orion Metal Industries Moorabbin`}
            fill
            className="object-cover grayscale-[35%] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
            sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 32vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-ink-3/25 to-transparent" />

          <span className="glass absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-[11px] font-bold tabular-nums tracking-wider text-white/85">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand-red via-brand-red-bright to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-[17px] font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand-red-bright sm:text-xl">
            {service.name}
          </h3>

          <p className="mt-3 flex-1 text-[13.5px] leading-[1.7] text-brand-muted sm:text-sm">
            {detailed ? service.overview : service.shortDescription}
          </p>

          {detailed && materialPreview.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {materialPreview.map((name) => (
                <span
                  key={name}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold text-white/75"
                >
                  {name}
                </span>
              ))}
              <span className="self-center text-[10px] font-bold uppercase tracking-wide text-brand-red">
                + more
              </span>
            </div>
          )}

          {detailed && (
            <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
              {service.applications.slice(0, 3).map((app) => (
                <li key={app} className="flex items-start gap-2.5 text-xs leading-relaxed text-brand-faint">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                  {app}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/services#${service.id}`}
            className="mt-6 inline-flex items-center gap-2 self-start text-[10.5px] font-bold uppercase tracking-[0.2em] text-brand-red transition-colors duration-300 hover:text-brand-red-bright"
          >
            Explore Service
            <svg
              className="h-3 w-3 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" />
            </svg>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function ServiceGrid({ services: serviceList, detailed = false }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {serviceList.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} detailed={detailed} />
      ))}
    </div>
  );
}
