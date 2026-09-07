import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark border border-brand-red",
  secondary:
    "bg-transparent text-white border border-white/30 hover:border-brand-red hover:text-brand-red",
  outline:
    "bg-transparent text-brand-red border border-brand-red hover:bg-brand-red hover:text-white",
  ghost: "bg-transparent text-white hover:text-brand-red",
  white: "bg-white text-brand-black hover:bg-gray-100 border border-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
