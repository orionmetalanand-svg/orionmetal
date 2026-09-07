"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll-snap carousel. No dependencies, keyboard accessible,
 * works with any children (cards, images, reviews).
 */
export default function Carousel({
  children,
  itemClassName = "min-w-[85%] sm:min-w-[48%] lg:min-w-[32%]",
  gap = "gap-5",
  light = false,
  ariaLabel = "Carousel",
  autoPlay = false,
  interval = 5000,
}) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = Array.isArray(children) ? children.filter(Boolean) : [children];

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft < 8);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);
    const child = el.children[0];
    if (child) {
      const step = child.getBoundingClientRect().width + 20;
      setActiveIndex(Math.round(scrollLeft / step));
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollByCards = useCallback((direction) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[0];
    const step = child ? child.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  const scrollToIndex = useCallback((index) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[0];
    const step = child ? child.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollTo({ left: step * index, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollLeft + clientWidth >= scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCards(1);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, scrollByCards]);

  const arrowBase = light
    ? "border-black/10 bg-white/80 text-brand-black hover:border-brand-red hover:text-brand-red"
    : "border-white/15 bg-white/5 text-white hover:border-brand-red hover:text-brand-red-bright";

  return (
    <div className="relative" role="group" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2 ${gap}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCards(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCards(-1);
          }
        }}
      >
        {items.map((child, i) => (
          <div key={i} className={`snap-start shrink-0 ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={activeIndex === i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-brand-red"
                  : light
                    ? "w-3 bg-black/15 hover:bg-black/30"
                    : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Previous slide"
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${arrowBase}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Next slide"
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${arrowBase}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
