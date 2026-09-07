import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function ServiceCard({ service, detailed = false }) {
  return (
    <article className="group flex flex-col overflow-hidden border border-white/10 bg-brand-dark transition-colors hover:border-brand-red/50">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.name} — Orion Metal Industries`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-white">{service.name}</h3>
        <p className="mt-3 flex-1 text-brand-muted leading-relaxed">
          {detailed ? service.overview : service.shortDescription}
        </p>
        {detailed && (
          <ul className="mt-4 space-y-1 text-sm text-brand-muted">
            {service.applications.slice(0, 3).map((app) => (
              <li key={app} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                {app}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <Button href={`/services#${service.id}`} variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ServiceGrid({ services: serviceList, detailed = false }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {serviceList.map((service) => (
        <ServiceCard key={service.id} service={service} detailed={detailed} />
      ))}
    </div>
  );
}
