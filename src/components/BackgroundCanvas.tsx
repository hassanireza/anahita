import { useEffect, useRef } from "react";

export type BackgroundTheme = "home" | "persia" | "egypt" | "greek";

const CFG: Record<BackgroundTheme, { rgb: string; mode: "float" | "ember" | "sand" | "star" }> = {
  home: { rgb: "201,168,76", mode: "float" },
  persia: { rgb: "232,163,61", mode: "ember" },
  egypt: { rgb: "212,170,90", mode: "sand" },
  greek: { rgb: "150,190,230", mode: "star" },
};

interface P { x: number; y: number; r: number; vx: number; vy: number; a: number; ph: number }

/**
 * Atmosphere = static CSS stage (pavement / vignette, see .bg-stage) plus a
 * very light particle layer: no O(n²) line drawing, DPR capped at 1.5,
 * paused when the tab is hidden, disabled for reduced-motion users.
 */
export function BackgroundCanvas({ theme }: { theme: BackgroundTheme }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { rgb, mode } = CFG[theme];
    const small = window.innerWidth < 720;
    const count = small ? 26 : 56;
    let w = 0, h = 0, raf = 0, parts: P[] = [];

    const spawn = (initial: boolean): P => ({
      x: Math.random() * w,
      y: mode === "ember" && !initial ? h + 10 : Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      vx: mode === "sand" ? Math.random() * 0.35 + 0.1 : (Math.random() - 0.5) * 0.2,
      vy: mode === "ember" ? -(Math.random() * 0.5 + 0.15) : mode === "sand" ? Math.random() * 0.06 : (Math.random() - 0.5) * 0.1,
      a: Math.random() * 0.55 + 0.15,
      ph: Math.random() * Math.PI * 2,
    });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: count }, () => spawn(true));
    };
    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x > w + 10) p.x = -10; else if (p.x < -10) p.x = w + 10;
        if (p.y < -10 || p.y > h + 10) Object.assign(p, spawn(false), mode === "ember" ? {} : { y: p.y < 0 ? h : 0 });
        const tw = mode === "star" || mode === "ember" ? 0.55 + 0.45 * Math.sin(t / 900 + p.ph) : 1;
        ctx.fillStyle = `rgba(${rgb},${(p.a * tw).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); };
    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", onVis); };
  }, [theme]);

  return (
    <div className={`bg-stage bg-${theme}`} aria-hidden="true">
      <canvas ref={ref} className="bg-canvas" />
    </div>
  );
}
