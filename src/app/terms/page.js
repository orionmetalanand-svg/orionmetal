import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/data/company";
import { getPageMetadata } from "@/data/seo";

export const metadata = getPageMetadata("terms");

export default function TermsPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Use"
          description={`Last updated: ${new Date().getFullYear()}`}
          light
        />
        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
          <p>
            By accessing and using the {company.name} website, you agree to these terms of use.
          </p>
          <h2 className="text-xl font-bold text-brand-black">Website Content</h2>
          <p>
            All content on this website is provided for general information purposes. While we
            endeavour to keep information accurate and up to date, we make no warranties about the
            completeness or accuracy of website content.
          </p>
          <h2 className="text-xl font-bold text-brand-black">Enquiries & Quotes</h2>
          <p>
            Submitting an enquiry through our website does not constitute a binding agreement.
            Quotes and project terms are provided separately upon review of your requirements.
          </p>
          <h2 className="text-xl font-bold text-brand-black">Intellectual Property</h2>
          <p>
            All website content, including text, images, and design, is the property of{" "}
            {company.name} unless otherwise stated. Unauthorised reproduction is prohibited.
          </p>
          <h2 className="text-xl font-bold text-brand-black">Contact</h2>
          <p>
            For questions about these terms, contact us at {company.phone} or visit{" "}
            {company.address.full}.
          </p>
        </div>
      </div>
    </section>
  );
}
