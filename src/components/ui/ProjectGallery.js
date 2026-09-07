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
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
              activeCategory === cat
                ? "bg-brand-red text-white shadow-[0_10px_34px_-12px_rgba(225,29,46,0.85)]"
                : "glass text-white/65 hover:border-brand-red/45 hover:text-white"
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
            className={`group relative overflow-hidden rounded-2xl border border-white/10 text-left transition-all duration-500 hover:border-brand-red/45 hover:shadow-[0_30px_70px_-32px_rgba(225,29,46,0.55)] ${
              i % 5 === 0 ? "sm:row-span-2" : ""
            }`}
          >
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category} by Orion Metal Industries`}
              fill
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 32vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/35 to-transparent transition-opacity duration-500 group-hover:from-brand-black" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="glass-red inline-block rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-brand-red-bright">
                {project.category}
              </span>
              <h3 className="mt-2.5 text-base font-bold leading-snug text-white sm:text-lg">
                {project.title}
              </h3>
              <p className="mt-1 max-h-0 overflow-hidden text-xs leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                {project.description}
              </p>
            </div>

            <span className="glass absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-black/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-strong relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-black/70 text-white backdrop-blur transition-colors hover:bg-brand-red"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-[16/10] w-full bg-brand-black">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-contain"
                sizes="(max-width:1024px) 100vw, 1024px"
              />
            </div>

            <div className="border-t border-white/10 p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="glass-red rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red-bright">
                  {selected.category}
                </span>
                <span className="rounded-full border border-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  {selected.industry}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">{selected.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
