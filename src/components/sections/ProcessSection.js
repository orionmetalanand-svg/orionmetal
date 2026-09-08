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
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-grid opacity-80" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="absolute right-0 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-brand-red/[0.08] blur-[140px]" />

      <div className="section-padding container-wide relative">
        <SectionHeading
          eyebrow="Process"
          title="From Drawing to Dispatch"
          accentWord="Dispatch"
          description="A streamlined fabrication workflow that keeps your project moving — managed under one roof in Moorabbin."
          align="center"
        />

        <div className="relative mt-12 sm:mt-16">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 100}>
                <div className="group relative h-full">
                  {/* Step marker */}
                  <div className="relative z-10 mb-6 flex items-center gap-4">
                    <span className="panel flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold tabular-nums text-white transition-all duration-500 group-hover:border-brand-red/50 group-hover:text-brand-red-bright">
                      {item.step}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-brand-red/45 to-transparent lg:hidden" />
                  </div>

                  <div className="glass hover-lift h-full rounded-2xl p-5 hover:border-white/16 sm:p-6">
                    <h3 className="text-[15.5px] font-bold text-white sm:text-[17px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-brand-muted">
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
