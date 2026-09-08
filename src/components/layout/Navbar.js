"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
import { company } from "@/data/company";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

function WhatsAppGlyph({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-ink lg:block">
        <div className="container-wide container-gutter flex items-center justify-between py-2.5 text-[11px] tracking-[0.02em] text-white/45">
          <p className="flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-brand-red" />
            {company.address.full}
          </p>
          <div className="flex items-center gap-7">
            <span className="uppercase tracking-[0.2em] text-white/35">
              {company.tagline}
            </span>
            <span className="h-3 w-px bg-white/10" />
            <a
              href={getTelUrl()}
              className="font-semibold tracking-normal text-white/75 transition-colors hover:text-brand-red-bright"
            >
              {company.phone}
            </a>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-ink/85 shadow-[0_18px_40px_-30px_rgba(0,0,0,1)] backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/70"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-wide container-gutter flex items-center justify-between gap-4 py-2.5 sm:py-3 lg:py-4"
          aria-label="Main navigation"
        >
          <Logo variant="light" size="lg" priority />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative block px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                      active ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3 -bottom-px h-[2px] origin-left rounded-full bg-brand-red transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Orion Metal Industries on WhatsApp"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-all duration-300 hover:border-brand-red/50 hover:text-brand-red-bright"
            >
              <WhatsAppGlyph className="h-[18px] w-[18px]" />
            </a>
            <Button href="/contact" variant="primary" size="sm">
              Request a Quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="glass flex h-12 w-12 items-center justify-center rounded-xl lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="flex flex-col items-center gap-[5px]">
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink/80 backdrop-blur-md transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-white/[0.07] bg-ink/97 px-5 pb-9 pt-24 shadow-[0_40px_80px_-40px_rgba(0,0,0,1)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

          <ul className="space-y-1.5">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-[15px] font-semibold transition-colors ${
                      active
                        ? "border-brand-red/30 bg-brand-red/10 text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-white/75 hover:border-white/12 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 ${active ? "text-brand-red" : "text-white/25"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-7 grid gap-3">
            <Button href="/contact" variant="primary" size="md" className="w-full">
              Request a Quote
            </Button>
            <Button
              href={getWhatsAppUrl()}
              variant="secondary"
              size="md"
              external
              icon={false}
              className="w-full"
            >
              <WhatsAppGlyph />
              WhatsApp Us
            </Button>
          </div>

          <div className="mt-7 space-y-3 border-t border-white/[0.07] pt-6">
            <a
              href={getTelUrl()}
              className="block text-sm font-bold text-white transition-colors hover:text-brand-red-bright"
            >
              {company.phoneDisplay}
            </a>
            <address className="not-italic text-xs leading-relaxed text-brand-faint">
              {company.address.full}
            </address>
          </div>
        </div>
      </div>
    </>
  );
}
