import { useEffect } from "react";

/**
 * Re-implements the original vanilla-JS IntersectionObserver reveal
 * effect declaratively. Any element rendered with the "reveal" class
 * fades and slides into place the first time it enters the viewport.
 * The effect re-scans the DOM whenever `deps` changes, which lets a
 * page re-run the observer after route changes or filtered results.
 */
export function useScrollReveal(deps: ReadonlyArray<unknown> = []): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            window.setTimeout(() => el.classList.add("visible"), i * 60);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("visible")) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
