import Link from "next/link";
import Button from "@/components/ui/Button";
import { navigation } from "@/data/navigation";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-brand-black">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-radial-red" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-red/15 blur-[130px] animate-glow-pulse" />
      </div>

      <div className="section-padding container-wide relative text-center">
        <p className="text-[6rem] font-bold leading-none text-brand-red text-glow-red sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          <span className="gradient-white-text">Page Not Found</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-muted sm:text-base">
          The page you are looking for may have moved or no longer exists.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-brand-red/45 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
