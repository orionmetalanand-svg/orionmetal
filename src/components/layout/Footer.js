import Link from "next/link";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
import { services } from "@/data/services";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function ColumnHeading({ children }) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
      {children}
    </h3>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2.5 text-[13.5px] text-brand-muted transition-colors duration-300 hover:text-white"
    >
      <span className="h-px w-0 bg-brand-red transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-3.5" />
      {children}
    </Link>
  );
}

function SocialIconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/55 transition-colors duration-300 hover:border-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-2">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="absolute -left-40 -top-24 h-[420px] w-[420px] rounded-full bg-brand-red/[0.07] blur-[140px]" />

      <div className="container-wide container-gutter relative pb-9 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" size="lg" />

            <p className="mt-7 max-w-sm text-[14.5px] leading-[1.75] text-brand-muted">
              {company.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-red" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                {company.tagline}
              </p>
            </div>

            {(company.social?.instagram || company.social?.facebook) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {company.social.instagram && (
                  <SocialIconLink href={company.social.instagram} label="Orion Metal Industries on Instagram">
                    <InstagramIcon />
                  </SocialIconLink>
                )}
                {company.social.facebook && (
                  <SocialIconLink href={company.social.facebook} label="Orion Metal Industries on Facebook">
                    <FacebookIcon />
                  </SocialIconLink>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:col-span-8 lg:grid-cols-12">
            {/* Navigation */}
            <div className="lg:col-span-3">
              <ColumnHeading>Navigate</ColumnHeading>
              <ul className="mt-6 space-y-3.5">
                {navigation.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-4">
              <ColumnHeading>Capabilities</ColumnHeading>
              <ul className="mt-6 space-y-3.5">
                {services.map((service) => (
                  <li key={service.id}>
                    <FooterLink href={`/services#${service.id}`}>{service.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="sm:col-span-2 lg:col-span-5">
              <ColumnHeading>Get in Touch</ColumnHeading>

              <div className="mt-6 space-y-5">
                <div className="flex gap-3.5">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <address className="not-italic text-[13.5px] leading-[1.7] text-brand-muted">
                    {company.address.street}
                    <br />
                    {company.address.suburb} {company.address.state} {company.address.postcode}
                    <br />
                    {company.address.country}
                  </address>
                </div>

                <a href={getTelUrl()} className="group flex items-center gap-3.5">
                  <svg
                    className="h-4 w-4 shrink-0 text-brand-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-[15px] font-bold text-white transition-colors group-hover:text-brand-red-bright">
                    {company.phoneDisplay}
                  </span>
                </a>
              </div>

              <div className="mt-7 grid gap-3 sm:max-w-xs">
                <Button href="/contact" variant="primary" size="sm" className="w-full">
                  Request a Quote
                </Button>
                <Button
                  href={getWhatsAppUrl()}
                  variant="secondary"
                  size="sm"
                  external
                  className="w-full"
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/[0.07] pt-7 lg:mt-20">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[11.5px] text-brand-faint">
              &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11.5px] text-brand-faint transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <span className="text-[10px] uppercase tracking-[0.22em] text-brand-faint">
                {company.secondaryTagline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
