import Link from "next/link";
import { company } from "@/data/company";
import { footerLinks } from "@/data/navigation";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-dark">
      <div className="section-padding container-wide">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-white">{company.shortName}</h3>
            <p className="mt-3 text-sm text-brand-muted leading-relaxed">{company.tagline}</p>
            <address className="mt-4 not-italic text-sm text-brand-muted leading-relaxed">
              {company.address.street}
              <br />
              {company.address.suburb} {company.address.state} {company.address.postcode}
              <br />
              {company.address.country}
            </address>
            <p className="mt-3">
              <a href={getTelUrl()} className="text-sm text-white hover:text-brand-red">
                {company.phone}
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-red">Navigation</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-muted hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-red">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-brand-muted">
              <li>Precision Laser Cutting</li>
              <li>Sheet Metal Bending</li>
              <li>Metal Fabrication</li>
              <li>Powder Coating</li>
              <li>Custom Assembly</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-red">Get in Touch</h4>
            <p className="mt-4 text-sm text-brand-muted">
              Request a quote or send your drawings for a fabrication enquiry.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Button href="/contact" variant="primary" size="sm">
                Request a Quote
              </Button>
              <Button href={getWhatsAppUrl()} variant="outline" size="sm" external>
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-brand-muted">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-sm text-brand-muted">{company.secondaryTagline}</p>
        </div>
      </div>
    </footer>
  );
}
