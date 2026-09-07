import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TrustedCustomers({ customers }) {
  if (!customers?.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Trusted By"
          title="Trusted by Commercial & Industrial Clients"
          description="We work with commercial, industrial, and engineering clients across Melbourne and Victoria. Customer names shown are placeholders — update with verified client logos and links when ready."
          align="center"
          light
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {customers.map((customer) => {
            const content = (
              <div className="flex h-24 flex-col items-center justify-center border border-gray-200 bg-gray-50 p-4 text-center transition-colors hover:border-brand-red/40">
                {customer.logoUrl ? (
                  <Image
                    src={customer.logoUrl}
                    alt={`${customer.name} logo`}
                    width={120}
                    height={48}
                    className="max-h-12 w-auto object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-brand-black">{customer.name}</span>
                )}
                {customer.industry && (
                  <span className="mt-1 text-xs text-gray-500">{customer.industry}</span>
                )}
              </div>
            );

            if (customer.websiteUrl) {
              return (
                <a
                  key={customer.id}
                  href={customer.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${customer.name} website`}
                >
                  {content}
                </a>
              );
            }

            return <div key={customer.id}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
