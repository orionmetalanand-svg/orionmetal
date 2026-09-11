/**
 * Renders grouped materials / thickness capabilities for a service.
 * Used on the Services page detail sections when `service.materialsSection` is defined.
 */
export default function ServiceMaterialsPanel({ section, compact = false }) {
  if (!section?.groups?.length) return null;

  return (
    <div
      className={`glass rounded-2xl border border-white/[0.08] ${
        compact ? "p-5 sm:p-6" : "p-5 sm:p-7"
      }`}
    >
      <h3
        className={`font-bold text-white ${
          compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
        }`}
      >
        {section.title}
      </h3>
      {section.description && (
        <p className="mt-3 text-[13px] leading-[1.7] text-brand-muted sm:text-[14px]">
          {section.description}
        </p>
      )}

      <div className={`mt-6 grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        {section.groups.map((group) => (
          <div
            key={group.label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5"
          >
            <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-brand-red-bright">
              {group.label}
            </p>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-snug text-white/90">
                      {item.name}
                    </p>
                    {item.detail && (
                      <p className="mt-1 text-[11.5px] leading-relaxed text-brand-faint">
                        {item.detail}
                      </p>
                    )}
                  </div>
                  {item.thickness && (
                    <span className="shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white/70">
                      {item.thickness}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** First N material names — for compact previews on service cards. */
export function getMaterialPreviewNames(section, limit = 5) {
  if (!section?.groups?.length) return [];
  return section.groups.flatMap((group) => group.items.map((item) => item.name)).slice(0, limit);
}
