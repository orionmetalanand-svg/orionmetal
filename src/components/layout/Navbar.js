"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/navigation";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-black/95 backdrop-blur-md">
      <nav className="container-wide flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="relative flex shrink-0 items-center gap-3" aria-label="Orion Metal Industries — Home">
          <Image
            src="/images/company/orion-logo.jpeg"
            alt="Orion Metal Industries logo"
            width={160}
            height={48}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-brand-red"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={getWhatsAppUrl()} variant="primary" size="sm" external>
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-white/20 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-brand-black lg:hidden">
          <ul className="px-4 py-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-white/5 px-2 py-3 text-white/90 hover:text-brand-red"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button href={getWhatsAppUrl()} variant="primary" size="sm" external className="w-full">
                WhatsApp Us
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
