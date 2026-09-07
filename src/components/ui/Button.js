import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-red text-white border border-brand-red/60 hover:bg-brand-red-bright hover:border-brand-red-bright shadow-[0_10px_40px_-14px_rgba(225,29,46,0.85)] hover:shadow-[0_14px_50px_-10px_rgba(255,51,72,0.95)]",
  secondary:
    "glass text-white hover:border-brand-red/60 hover:bg-white/10",
  outline:
    "bg-transparent text-brand-red border border-brand-red/50 hover:bg-brand-red hover:text-white hover:border-brand-red",
  ghost: "bg-transparent text-white/80 hover:text-brand-red-bright",
  white:
    "bg-white text-brand-black border border-white hover:bg-white/90 shadow-[0_10px_40px_-14px_rgba(255,255,255,0.5)]",
  dark: "bg-brand-black text-white border border-white/15 hover:border-brand-red/60",
};

const sizes = {
  sm: "px-4 py-2.5 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-sm",
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
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-bright",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <svg
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
