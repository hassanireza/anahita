import { useEffect } from "react";

/**
 * Adds `.visible` to every `.reveal` element as it nears the viewport.
 * Siblings revealed in the same frame are staggered via --d (capped) so
 * grids cascade instead of popping in together. Re-scans when `deps` change.
 */
export function useScrollReveal(deps: ReadonlyArray<unknown> = []): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.visible)"));
    if (els.length === 0) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.setProperty("--d", `${Math.min(n++, 6) * 70}ms`);
          el.classList.add("visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
