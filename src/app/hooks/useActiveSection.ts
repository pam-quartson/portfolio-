import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Tracks which section is in view via IntersectionObserver.
 * Picks the section with the highest intersection ratio when several overlap.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const ratiosRef = useRef<Map<string, number>>(new Map());

  const updateActive = useCallback(() => {
    let bestId = ids[0] ?? "";
    let bestRatio = -1;
    for (const id of ids) {
      const ratio = ratiosRef.current.get(id) ?? 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    }
    if (bestRatio > 0) setActive(bestId);
  }, [ids]);

  useEffect(() => {
    ratiosRef.current.clear();
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratiosRef.current.set(id, entry?.isIntersecting ? (entry.intersectionRatio ?? 0) : 0);
          updateActive();
        },
        { rootMargin: "-20% 0px -35% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids, updateActive]);

  return active;
}

export function scrollToSection(id: string, prefersReducedMotion: boolean) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
