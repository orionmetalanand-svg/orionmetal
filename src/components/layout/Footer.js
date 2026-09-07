import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
import { services } from "@/data/services";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-brand-dark">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-brand-red/10 blur-[120px]" />

      <div className="container-wide relative px-5 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Orion Metal Industries — Home">
              <span className="inline-block rounded-xl bg-white p-2">
                <Image
                  src="/images/company/orion-logo.jpeg"
                  alt="Orion Metal Industries Pty Ltd logo"
                  width={190}
                  height={56}
                  className="h-11 w-auto object-contain"
                />
              </span>
            </Link>

            <p className="mt-6 text-sm leading-relaxed text-brand-muted">
              {company.description}
            </p>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
              {company.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="group inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-3" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Get in Touch
            </h3>

            <address className="mt-5 not-italic text-sm leading-relaxed text-brand-muted">
              {company.address.street}
              <br />
              {company.address.suburb} {company.address.state} {company.address.postcode}
              <br />
              {company.address.country}
            </address>

            <a
              href={getTelUrl()}
              className="mt-4 inline-block text-sm font-bold text-white transition-colors hover:text-brand-red"
            >
              {company.phone}
            </a>

            <div className="mt-6 grid gap-3">
              <Button href="/contact" variant="primary" size="sm" className="w-full">
                Request a Quote
              </Button>
              <Button href={getWhatsAppUrl()} variant="secondary" size="sm" external className="w-full">
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-brand-faint">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-brand-faint transition-colors hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-xs uppercase tracking-[0.18em] text-brand-faint">
              {company.secondaryTagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
