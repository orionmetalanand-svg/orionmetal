import Image from "next/image";

export default function IndustryCard({ industry }) {
  return (
    <article className="group relative overflow-hidden border border-white/10 bg-brand-dark">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={industry.image}
          alt={`${industry.name} — Orion Metal Industries`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-brand-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-white">{industry.name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-brand-muted leading-relaxed">{industry.description}</p>
        <ul className="mt-4 space-y-2">
          {industry.applications.slice(0, 3).map((app) => (
            <li key={app} className="flex items-start gap-2 text-sm text-brand-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" />
              {app}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
