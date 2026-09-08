import Link from "next/link";
import Button from "@/components/ui/Button";
import { navigation } from "@/data/navigation";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-90" />
        <div className="absolute inset-0 bg-radial-red" />
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-noise opacity-[0.04]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-red/[0.13] blur-[140px] animate-glow-pulse" />
      </div>

      <div className="section-padding container-wide relative text-center">
        <p className="text-[5rem] font-extrabold leading-none tracking-tighter text-brand-red text-glow-red sm:text-[8rem]">
          404
        </p>

        <div className="mx-auto mt-4 max-w-xs">
          <div className="hairline-red" />
        </div>

        <h1 className="mt-7 text-[1.75rem] font-extrabold sm:text-4xl">
          <span className="gradient-white-text">Page Not Found</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-[1.75] text-brand-muted sm:text-base">
          The page you are looking for may have moved or no longer exists.
        </p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
            Contact Us
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55 transition-colors duration-300 hover:border-white/20 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
