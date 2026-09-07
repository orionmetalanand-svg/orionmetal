"use client";

import { useState } from "react";
import Image from "next/image";
import { projectCategories } from "@/data/projects";

export default function ProjectGallery({ projects }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
              activeCategory === cat
                ? "bg-brand-red text-white"
                : "border border-white/20 text-brand-muted hover:border-brand-red hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <button
            key={project.id}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden border border-white/10 text-left"
            onClick={() => setSelectedProject(project)}
            aria-label={`View ${project.title}`}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 p-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                {project.category}
              </span>
              <h3 className="mt-1 text-lg font-bold text-white">{project.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-brand-dark border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-brand-black text-white hover:bg-brand-red"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative aspect-[16/10]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width:896px) 100vw, 896px"
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                {selectedProject.category} · {selectedProject.industry}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white">{selectedProject.title}</h3>
              <p className="mt-3 text-brand-muted leading-relaxed">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
