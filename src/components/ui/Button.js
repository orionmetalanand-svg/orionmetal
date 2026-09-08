import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: [
    "text-white border border-brand-red/70",
    "bg-[linear-gradient(180deg,#f0263a_0%,#e11d2e_55%,#c0142a_100%)]",
    "shadow-red hover:shadow-red-lift",
    "hover:border-brand-red-bright",
    "hover:bg-[linear-gradient(180deg,#ff3d50_0%,#ec1f34_55%,#c9152d_100%)]",
  ].join(" "),
  secondary: "glass text-white hover:border-white/20 hover:bg-white/[0.07]",
  /** Legible on both light and dark surfaces — red on transparent. */
  outline:
    "bg-transparent text-brand-red border border-brand-red/45 hover:border-brand-red hover:bg-brand-red hover:text-white",
  ghost:
    "bg-transparent text-white/60 border border-transparent hover:text-white hover:border-white/12",
  white:
    "bg-white text-ink border border-white hover:bg-white/92 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_14px_40px_-16px_rgba(255,255,255,0.35)]",
  dark: "bg-ink-3 text-white border border-white/10 hover:border-brand-red/50 hover:bg-ink-4",
};

const sizes = {
  sm: "h-11 px-5 text-[11px] tracking-[0.13em]",
  md: "h-12 px-6 text-[12px] tracking-[0.13em]",
  lg: "h-[3.375rem] px-8 text-[12px] tracking-[0.14em]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  icon = true,
  ...props
}) {
  const classes = cn(
    "sheen group relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-bold uppercase leading-none",
    "transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-bright",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {icon && (
        <svg
          className="relative z-10 h-3 w-3 shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" />
        </svg>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
