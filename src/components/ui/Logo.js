import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { brand } from "@/config/images";

const sizes = {
  sm: "h-10 sm:h-11",
  md: "h-12 sm:h-14",
  lg: "h-14 sm:h-16 lg:h-[4.5rem]",
  xl: "h-20 sm:h-24 lg:h-28",
};

/**
 * Brand lockup. The source artwork is transparent with black wordmark, so dark
 * surfaces use the recoloured `light` variant and light surfaces use `dark`.
 */
export default function Logo({
  variant = "light",
  size = "md",
  href = "/",
  className = "",
  priority = false,
}) {
  const src = variant === "dark" ? brand.logoDark : brand.logoLight;

  const image = (
    <Image
      src={src}
      alt={`${company.name} — precision sheet metal fabrication, Moorabbin`}
      width={brand.logoWidth}
      height={brand.logoHeight}
      priority={priority}
      sizes="(max-width: 640px) 220px, 320px"
      className={`w-auto object-contain ${sizes[size]} ${className}`}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      aria-label={`${company.name} — Home`}
      className="group inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-85"
    >
      {image}
    </Link>
  );
}
