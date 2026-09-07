"use client";

import dynamic from "next/dynamic";

const HeroVisual = dynamic(() => import("@/components/sections/HeroVisual"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-brand-black" aria-hidden="true" />,
});

export default function HeroVisualWrapper() {
  return (
    <div className="absolute right-0 top-0 hidden h-full w-1/3 opacity-30 lg:block">
      <HeroVisual />
    </div>
  );
}
