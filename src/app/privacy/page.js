import PageHero from "@/components/sections/PageHero";
import { company } from "@/data/company";
import { getPageMetadata } from "@/data/seo";

export const metadata = getPageMetadata("privacy");

const sections = [
  {
    heading: "Information We Collect",
    body: "When you submit an enquiry through our contact form, we may collect your name, company name, email address, phone number, service requirements, message content, and any files you upload (such as drawings or specifications).",
  },
  {
    heading: "How We Use Your Information",
    body: "We use your information to respond to your enquiry, provide quotes, and communicate about your fabrication requirements. We do not sell or share your personal information with third parties for marketing purposes.",
  },
  {
    heading: "Data Security",
    body: "We take reasonable steps to protect your personal information from unauthorised access, modification, or disclosure. Files submitted through our website are transmitted securely and used only for quoting and production purposes.",
  },
  {
    heading: "Cookies & Analytics",
    body: "This website may use essential cookies for functionality. If analytics tools are added in future, this policy will be updated to describe what is collected and how it is used.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        accentWord="Privacy"
        description={`How Orion Metal Industries Pty Ltd handles information submitted through this website. Last updated ${new Date().getFullYear()}.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-light opacity-50" />

        <div className="section-padding container-wide relative max-w-3xl">
          <p className="text-[15px] leading-[1.8] text-gray-600">
            {company.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy.
            This policy describes how we collect, use, and protect personal information submitted
            through our website.
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
            <h2 className="text-lg font-bold text-brand-black">Contact Us</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              For privacy-related enquiries, contact us at{" "}
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
