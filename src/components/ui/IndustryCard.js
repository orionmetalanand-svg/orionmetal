import Image from "next/image";
import Reveal from "./Reveal";

export default function IndustryCard({ industry, index = 0 }) {
  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="hover-lift group relative h-full overflow-hidden rounded-2xl border border-white/[0.09] hover:-translate-y-1.5 hover:border-white/18 hover:shadow-lift">
        <Image
          src={industry.image}
          alt={`${industry.name} sheet metal fabrication — Orion Metal Industries`}
          fill
          className="object-cover grayscale-[45%] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:grayscale-0"
          sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 32vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/88 to-ink/30" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/12 via-transparent to-transparent" />
        </div>
        <span className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

        <div className="relative flex min-h-[19rem] flex-col justify-end p-5 sm:min-h-[25rem] sm:p-6">
          <span className="accent-rule mb-5 transition-all duration-500 group-hover:w-20" />

          <h3 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
            {industry.name}
          </h3>

          <p className="mt-3 text-[13.5px] leading-[1.7] text-brand-muted">
            {industry.description}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-white/[0.09] pt-5">
            {industry.applications.slice(0, 3).map((app) => (
              <li key={app} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/60">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                {app}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}
