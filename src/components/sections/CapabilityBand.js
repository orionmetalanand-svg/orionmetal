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
    <section className="bg-steel relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-noise opacity-[0.045]" />

      <div className="container-wide container-gutter relative grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 80}>
            <div className="group relative h-full px-3 py-8 transition-colors duration-500 hover:bg-white/[0.025] sm:px-6 sm:py-11 lg:px-8 lg:py-14">
              {/* Vertical hairline on every cell that isn't first in its row */}
              <span
                className={`absolute inset-y-5 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent ${
                  i === 0 ? "hidden" : i % 2 === 0 ? "hidden lg:block" : "block"
                }`}
              />
              {/* Row divider — only needed for the second row of the 2-up mobile grid */}
              {i >= 2 && (
                <span className="absolute inset-x-3 top-0 h-px bg-white/[0.06] sm:inset-x-6 lg:hidden" />
              )}

              <p className="text-[1.6rem] font-extrabold leading-none tracking-tight text-white transition-colors duration-500 group-hover:text-brand-red-bright sm:text-[2.1rem] lg:text-[2.6rem]">
                {item.value}
              </p>

              <span className="mt-3 block h-px w-8 bg-brand-red transition-all duration-500 group-hover:w-14" />

              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 sm:text-[11px] sm:tracking-[0.2em]">
                {item.label}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-brand-faint sm:text-[11.5px]">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
