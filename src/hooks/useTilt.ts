import { useEffect, type RefObject } from "react";

/** One delegated pointer listener that gives `.tilt` plates a subtle 3D tilt + light glare. Mouse only. */
export function useTilt(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let current: HTMLElement | null = null;

    const reset = () => {
      if (!current) return;
      current.style.setProperty("--rx", "0deg");
      current.style.setProperty("--ry", "0deg");
      current = null;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = (e.target as HTMLElement).closest<HTMLElement>(".tilt");
      if (target !== current) reset();
      if (!target) return;
      current = target;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        target.style.setProperty("--ry", `${((px - 0.5) * 9).toFixed(2)}deg`);
        target.style.setProperty("--rx", `${((0.5 - py) * 9).toFixed(2)}deg`);
        target.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        target.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      });
    };
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
    };
  }, [ref]);
}
