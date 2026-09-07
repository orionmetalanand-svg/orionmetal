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
        <div className="absolute inset-0 bg-grid-light opacity-50" />

        <div className="section-padding container-wide relative max-w-3xl">
          <p className="text-[15px] leading-[1.8] text-gray-600">
            By accessing and using the {company.name} website, you agree to these terms of use.
          </p>

          <div className="mt-10 space-y-9">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-brand-black">
                  <span className="mr-3 inline-block h-5 w-1 translate-y-0.5 rounded-full bg-brand-red align-middle" />
                  {section.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.8] text-gray-600">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-black/8 bg-brand-black/[0.02] p-7">
            <h2 className="text-lg font-bold text-brand-black">Questions</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
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
