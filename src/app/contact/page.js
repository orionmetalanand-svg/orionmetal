import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { getPageMetadata } from "@/data/seo";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Contact"
            title="Request a Quote"
            description="Send us your enquiry with drawings or specifications. We respond to all commercial and industrial fabrication enquiries."
            align="center"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <div className="border border-gray-200 bg-gray-50 p-8">
              <h2 className="text-xl font-bold text-brand-black">Contact Details</h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                    Company
                  </p>
                  <p className="mt-1">{company.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                    Address
                  </p>
                  <address className="mt-1 not-italic">
                    {company.address.street}
                    <br />
                    {company.address.suburb} {company.address.state}{" "}
                    {company.address.postcode}
                    <br />
                    {company.address.country}
                  </address>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                    Phone
                  </p>
                  <a href={getTelUrl()} className="mt-1 block text-brand-black hover:text-brand-red">
                    {company.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                    Contact Person
                  </p>
                  <p className="mt-1">{company.contactPerson}</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button href={getWhatsAppUrl()} variant="primary" size="md" external className="w-full">
                  WhatsApp Us
                </Button>
                <Button href={getTelUrl()} variant="outline" size="md" external className="w-full">
                  Call {company.phoneDisplay}
                </Button>
              </div>
            </div>

            <div className="mt-6 min-h-[250px] overflow-hidden border border-gray-200">
              <iframe
                src={company.location.embedUrl}
                title="Orion Metal Industries location — Moorabbin VIC 3189"
                className="h-full w-full min-h-[250px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Prefer to Talk Directly?"
        description="Call or WhatsApp us to discuss your fabrication requirements."
        primaryLabel="WhatsApp Us"
        primaryHref={getWhatsAppUrl()}
      />
    </>
  );
}
