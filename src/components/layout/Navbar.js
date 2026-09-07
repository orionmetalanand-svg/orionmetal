"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import { company } from "@/data/company";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden border-b border-white/5 bg-brand-black lg:block">
        <div className="container-wide flex items-center justify-between px-8 py-2 text-[11px] tracking-wide text-white/50">
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-brand-red" />
            {company.address.full}
          </p>
          <div className="flex items-center gap-6">
            <span className="uppercase tracking-[0.18em]">{company.tagline}</span>
            <a href={getTelUrl()} className="font-semibold text-white/80 transition-colors hover:text-brand-red">
              {company.phone}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-brand-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-brand-black/70"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-wide flex items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link href="/" className="group flex shrink-0 items-center" aria-label="Orion Metal Industries — Home">
            <span className="relative overflow-hidden rounded-xl bg-white p-1.5 transition-transform duration-300 group-hover:scale-[1.03]">
              <Image
                src="/images/company/orion-logo.jpeg"
                alt="Orion Metal Industries Pty Ltd logo"
                width={170}
                height={50}
                className="h-9 w-auto object-contain sm:h-11"
                priority
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-red transition-all duration-300 ${
                      isActive(item.href) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href={getWhatsAppUrl()} variant="primary" size="sm" external icon={false}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884" />
              </svg>
              WhatsApp
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="glass flex h-11 w-11 items-center justify-center rounded-xl lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col items-center gap-[5px]">
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-brand-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 border-b border-white/10 bg-brand-black/95 px-5 pb-8 pt-24 backdrop-blur-2xl transition-transform duration-400 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className="space-y-1">
            {navigation.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
                    isActive(item.href)
                      ? "glass-red text-white"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {item.label}
                  <svg className="h-4 w-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-3">
            <Button href="/contact" variant="primary" size="md" className="w-full">
              Request a Quote
            </Button>
            <Button href={getWhatsAppUrl()} variant="secondary" size="md" external className="w-full">
              WhatsApp Us
            </Button>
            <a
              href={getTelUrl()}
              className="text-center text-sm font-semibold text-white/60 transition-colors hover:text-brand-red"
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
