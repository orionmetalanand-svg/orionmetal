import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";

const items = [
  {
    value: String(services.length).padStart(2, "0"),
    label: "Core Services",
    detail: "Cutting, bending, fabrication, coating, assembly",
  },
  {
    value: "1A",
    label: "Moorabbin Facility",
    detail: "Bibby Ct, Moorabbin VIC 3189",
  },
  {
    value: "In-House",
    label: "Powder Coating",
    detail: "Integrated finishing line",
  },
  {
    value: "CAD",
    label: "File Ready",
    detail: "PDF · DWG · DXF · STEP",
  },
];

export default function CapabilityBand() {
  return (
    <section className="relative border-y border-white/5 bg-brand-black">
      <div className="absolute inset-0 bg-metal opacity-40" />
      <div className="container-wide relative grid grid-cols-2 gap-px lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 80}>
            <div className="group relative h-full px-4 py-8 text-center transition-colors duration-500 hover:bg-white/[0.03] sm:px-6 sm:py-10 lg:px-8 lg:py-14">
              {i > 0 && (
                <span className="absolute inset-y-4 left-0 hidden w-px bg-white/8 sm:inset-y-6 sm:block" />
              )}
              <p className="text-2xl font-bold tracking-tight text-brand-red transition-colors duration-300 group-hover:text-brand-red-bright sm:text-3xl lg:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:mt-3 sm:text-xs sm:tracking-[0.18em]">
                {item.label}
              </p>
              <p className="mt-1.5 hidden text-[11px] leading-relaxed text-brand-faint sm:mt-2 sm:block">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
