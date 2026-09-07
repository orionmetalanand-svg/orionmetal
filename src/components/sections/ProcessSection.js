import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    step: "01",
    title: "Enquiry & Drawings",
    description:
      "Submit your requirements, drawings, or specifications. We accept PDF, DWG, DXF, STEP, and image files.",
  },
  {
    step: "02",
    title: "Cutting & Forming",
    description:
      "Precision laser cutting and press brake bending to your exact dimensions and tolerances.",
  },
  {
    step: "03",
    title: "Fabrication & Coating",
    description:
      "Assembly, welding, and in-house powder coating for a durable, professionally finished product.",
  },
  {
    step: "04",
    title: "Quality & Dispatch",
    description:
      "Final inspection, protective packaging, palletising, and on-time delivery to your site.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute right-0 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-brand-red/10 blur-[130px]" />

      <div className="section-padding container-wide relative">
        <SectionHeading
          eyebrow="Process"
          title="From Drawing to Dispatch"
          accentWord="Dispatch"
          description="A streamlined fabrication workflow that keeps your project moving — managed under one roof in Moorabbin."
          align="center"
        />

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/12 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 100}>
                <div className="group relative h-full">
                  {/* Step marker */}
                  <div className="relative z-10 mb-6 flex items-center gap-4">
                    <span className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-brand-black text-xl font-bold text-white transition-all duration-500 group-hover:border-brand-red group-hover:text-brand-red group-hover:shadow-[0_0_40px_-10px_rgba(225,29,46,0.8)]">
                      {item.step}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-brand-red/50 to-transparent lg:hidden" />
                  </div>

                  <div className="glass hover-lift h-full rounded-2xl p-6 hover:border-brand-red/35">
                    <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
