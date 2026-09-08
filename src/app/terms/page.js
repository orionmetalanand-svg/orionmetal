import PageHero from "@/components/sections/PageHero";
import { company } from "@/data/company";
import { getPageMetadata } from "@/data/seo";

export const metadata = getPageMetadata("terms");

const sections = [
  {
    heading: "Website Content",
    body: "All content on this website is provided for general information purposes. While we endeavour to keep information accurate and up to date, we make no warranties about the completeness or accuracy of website content.",
  },
  {
    heading: "Enquiries & Quotes",
    body: "Submitting an enquiry through our website does not constitute a binding agreement. Quotes, lead times, and project terms are provided separately upon review of your drawings and requirements.",
  },
  {
    heading: "Drawings & Specifications",
    body: "Files you submit remain your property. We use them solely to prepare quotes and manufacture your order. You are responsible for ensuring you have the right to share any drawings submitted.",
  },
  {
    heading: "Intellectual Property",
    body: `All website content, including text, images, and design, is the property of ${company.name} unless otherwise stated. Unauthorised reproduction is prohibited.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        accentWord="Terms"
        description={`Terms governing use of the Orion Metal Industries Pty Ltd website. Last updated ${new Date().getFullYear()}.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-light opacity-60" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-red/40 to-transparent" />

        <div className="section-padding container-wide relative max-w-3xl">
          <p className="text-[15px] leading-[1.8] text-gray-600">
            By accessing and using the {company.name} website, you agree to these terms of use.
          </p>

          <div className="mt-10 space-y-9">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-bold text-ink sm:text-xl">
                  <span className="mr-3 inline-block h-5 w-1 translate-y-0.5 rounded-full bg-brand-red align-middle" />
                  {section.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.8] text-ink-4/70">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-5 shadow-[0_1px_2px_rgba(6,6,8,0.03)] sm:p-7">
            <h2 className="text-[17px] font-bold text-ink">Questions</h2>
            <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-4/70">
              For questions about these terms, contact us at{" "}
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-red hover:underline">
                {company.phone}
              </a>{" "}
              or visit us at {company.address.full}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
