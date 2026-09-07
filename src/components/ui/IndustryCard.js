import Image from "next/image";
import Reveal from "./Reveal";

export default function IndustryCard({ industry, index = 0 }) {
  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="group hover-lift relative h-full overflow-hidden rounded-2xl border border-white/10 hover:-translate-y-1.5 hover:border-brand-red/40">
        <Image
          src={industry.image}
          alt={`${industry.name} sheet metal fabrication — Orion Metal Industries`}
          fill
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 32vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/85 to-brand-black/25" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/0 to-brand-red/0 transition-all duration-500 group-hover:from-brand-red/12 group-hover:to-transparent" />

        <div className="relative flex min-h-[26rem] flex-col justify-end p-6">
          <span className="accent-rule mb-5 rounded-full transition-all duration-500 group-hover:w-20" />
          <h3 className="text-2xl font-bold text-white">{industry.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            {industry.description}
          </p>
          <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
            {industry.applications.slice(0, 3).map((app) => (
              <li key={app} className="flex items-start gap-2.5 text-xs text-white/60">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                {app}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}
