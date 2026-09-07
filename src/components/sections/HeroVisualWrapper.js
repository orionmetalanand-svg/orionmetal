"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroVisual = dynamic(() => import("@/components/sections/HeroVisual"), {
  ssr: false,
  loading: () => null,
});

export default function HeroVisualWrapper() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isWideEnough = window.matchMedia("(min-width: 768px)").matches;
    if (!prefersReduced && isWideEnough) {
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 400));
      idle(() => setEnabled(true));
    }
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block lg:w-[52%]">
      <HeroVisual />
    </div>
  );
}
