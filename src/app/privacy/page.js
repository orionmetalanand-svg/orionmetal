import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/data/company";
import { getPageMetadata } from "@/data/seo";

export const metadata = getPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Last updated: ${new Date().getFullYear()}`}
          light
        />
        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
          <p>
            {company.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy.
            This policy describes how we collect, use, and protect personal information submitted
            through our website.
          </p>
          <h2 className="text-xl font-bold text-brand-black">Information We Collect</h2>
          <p>
            When you submit an enquiry through our contact form, we may collect your name, company
            name, email address, phone number, service requirements, message content, and any files
            you upload (such as drawings or specifications).
          </p>
          <h2 className="text-xl font-bold text-brand-black">How We Use Your Information</h2>
          <p>
            We use your information to respond to your enquiry, provide quotes, and communicate
            about your fabrication requirements. We do not sell or share your personal information
            with third parties for marketing purposes.
          </p>
          <h2 className="text-xl font-bold text-brand-black">Data Security</h2>
          <p>
            We take reasonable steps to protect your personal information from unauthorised access,
            modification, or disclosure.
          </p>
          <h2 className="text-xl font-bold text-brand-black">Contact</h2>
          <p>
            For privacy-related enquiries, contact us at {company.phone} or visit{" "}
            {company.address.full}.
          </p>
        </div>
      </div>
    </section>
  );
}
