"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { projectCategories } from "@/data/projects";

export default function ProjectGallery({ projects }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!selected) return;

    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const index = filtered.findIndex((p) => p.id === selected.id);
        const next =
          e.key === "ArrowRight"
            ? (index + 1) % filtered.length
            : (index - 1 + filtered.length) % filtered.length;
        setSelected(filtered[next]);
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, filtered]);

  return (
    <>
      {/* Filters — horizontally scrollable on narrow screens */}
      <div
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="group"
        aria-label="Filter projects by category"
      >
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`shrink-0 rounded-full px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 ${
              activeCategory === cat
                ? "border border-brand-red/70 bg-[linear-gradient(180deg,#f0263a_0%,#e11d2e_55%,#c0142a_100%)] text-white shadow-red"
                : "glass text-white/60 hover:border-white/20 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      <div className="mt-8 grid auto-rows-[12rem] grid-cols-1 gap-3 sm:mt-10 sm:auto-rows-[16rem] sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setSelected(project)}
            aria-label={`View ${project.title}`}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] text-left transition-all duration-500 hover:border-white/20 hover:shadow-lift ${
              i % 5 === 0 ? "sm:row-span-2" : ""
            }`}
          >
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category} by Orion Metal Industries`}
              fill
              className="object-cover grayscale-[40%] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:grayscale-0"
              sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 32vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent transition-opacity duration-500 group-hover:from-ink" />
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <span className="glass-red inline-block rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-red-bright">
                {project.category}
              </span>
              <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-white sm:text-[17px]">
                {project.title}
              </h3>
              <p className="mt-1.5 max-h-0 overflow-hidden text-[12.5px] leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                {project.description}
              </p>
            </div>

            <span className="glass absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:right-4 sm:top-4">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/93 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-strong relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink/75 text-white backdrop-blur transition-colors hover:bg-brand-red sm:right-4 sm:top-4"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-[16/10] w-full bg-ink">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-contain"
                sizes="(max-width:1024px) 100vw, 1024px"
              />
            </div>

            <div className="border-t border-white/[0.08] p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="glass-red rounded-full px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-brand-red-bright">
                  {selected.category}
                </span>
                <span className="rounded-full border border-white/[0.11] px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-white/60">
                  {selected.industry}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold leading-tight text-white sm:text-2xl">
                {selected.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[13.5px] leading-[1.75] text-brand-muted sm:text-sm">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
