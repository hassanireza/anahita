import { useEffect, useRef } from "react";

export type BackgroundTheme = "home" | "persia" | "egypt" | "greek";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  o: number;
  pulse: number;
}

interface ThemeConfig {
  particleColor: string;
  bgGrad: [string, string];
  numParticles: number;
  lines: boolean;
}

const THEMES: Record<BackgroundTheme, ThemeConfig> = {
  home: { particleColor: "201,168,76", bgGrad: ["#0a0806", "#120f0a"], numParticles: 80, lines: true },
  persia: { particleColor: "212,160,23", bgGrad: ["#0c0401", "#160703"], numParticles: 60, lines: false },
  egypt: { particleColor: "200,169,110", bgGrad: ["#070502", "#0f0a04"], numParticles: 70, lines: false },
  greek: { particleColor: "91,141,184", bgGrad: ["#030608", "#05080f"], numParticles: 75, lines: true },
};

/**
 * Canvas-driven atmospheric background. Each civilization renders its
 * own faint sacred geometry: radiating flame lines for Persia, orbiting
 * rings and pyramids for Egypt, a meander grid and concentric orbits for
 * Greece, and a tri-color constellation for the home page.
 */
export function BackgroundCanvas({ theme }: { theme: BackgroundTheme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = THEMES[theme];
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;

    const buildParticles = () => {
      particles = Array.from({ length: config.numParticles }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.6 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildParticles();
    };

    const drawBg = () => {
      const grd = ctx.createLinearGradient(0, 0, 0, height);
      grd.addColorStop(0, config.bgGrad[0]);
      grd.addColorStop(1, config.bgGrad[1]);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    };

    const drawNebula = () => {
      const cx = width * 0.5;
      const cy = height * 0.4;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.5);
      grd.addColorStop(0, `rgba(${config.particleColor},0.04)`);
      grd.addColorStop(0.5, `rgba(${config.particleColor},0.015)`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    };

    const drawPersianGeometry = () => {
      ctx.save();
      ctx.strokeStyle = `rgba(${config.particleColor},0.04)`;
      ctx.lineWidth = 0.5;
      const cx = width / 2;
      const cy = height / 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const r1 = Math.min(width, height) * 0.25;
        const r2 = Math.min(width, height) * 0.45;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, r1 + i * 8, 0, Math.PI * 2);
        ctx.globalAlpha = 0.03;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      const fireTime = Date.now() * 0.001;
      for (let i = 0; i < 5; i++) {
        const y = height - 100 - i * 30 + Math.sin(fireTime * 2 + i) * 15;
        const x = width / 2 + Math.sin(fireTime + i * 1.3) * 40;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 60 - i * 10);
        grd.addColorStop(0, `rgba(228,86,42,${0.06 - i * 0.01})`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, 60 - i * 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawEgyptGeometry = () => {
      ctx.save();
      ctx.strokeStyle = `rgba(${config.particleColor},0.05)`;
      ctx.lineWidth = 0.5;
      const t = Date.now() * 0.0003;
      const cx = width / 2;
      const cy = height / 2;
      for (let ring = 0; ring < 5; ring++) {
        const r = 80 + ring * 70;
        ctx.beginPath();
        ctx.arc(cx, cy, r, t + ring * 0.5, t + ring * 0.5 + Math.PI * 2);
        ctx.globalAlpha = 0.04 - ring * 0.005;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      const pw = 200;
      const ph = 300;
      const px = width * 0.15;
      const py = height - ph;
      ctx.strokeStyle = `rgba(${config.particleColor},0.03)`;
      ctx.beginPath();
      ctx.moveTo(px, py + ph);
      ctx.lineTo(px + pw / 2, py);
      ctx.lineTo(px + pw, py + ph);
      ctx.closePath();
      ctx.stroke();
      const px2 = width * 0.75;
      ctx.beginPath();
      ctx.moveTo(px2, py + ph);
      ctx.lineTo(px2 + pw / 2, py);
      ctx.lineTo(px2 + pw, py + ph);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawGreekGeometry = () => {
      ctx.save();
      ctx.strokeStyle = `rgba(${config.particleColor},0.04)`;
      ctx.lineWidth = 0.5;
      const cols = Math.ceil(width / 80);
      const rows = Math.ceil(height / 80);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (Math.random() < 0.97) continue;
          const x = c * 80;
          const y = r * 80;
          ctx.beginPath();
          ctx.rect(x + 10, y + 10, 60, 60);
          ctx.stroke();
        }
      }
      const t = Date.now() * 0.0005;
      const cx = width / 2;
      const cy = height * 0.4;
      [120, 200, 300].forEach((r, i) => {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.02) {
          const direction = i % 2 === 0 ? 1 : -1;
          const x2 = cx + Math.cos(a + t * direction) * r;
          const y2 = cy + Math.sin(a + t * direction) * r;
          if (i === 0 && a === 0) ctx.moveTo(x2, y2);
          else ctx.lineTo(x2, y2);
        }
        ctx.globalAlpha = 0.03 + i * 0.005;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      ctx.restore();
    };

    const drawHomeGeometry = () => {
      ctx.save();
      ctx.lineWidth = 0.5;
      const cx = width / 2;
      const cy = height / 2;
      const t = Date.now() * 0.0002;
      const colors = ["201,168,76", "200,169,110", "91,141,184"];
      colors.forEach((c, i) => {
        ctx.strokeStyle = `rgba(${c},0.05)`;
        const r = 200 + i * 100;
        ctx.beginPath();
        ctx.arc(cx, cy, r, t + i * 2, t + i * 2 + Math.PI * 2);
        ctx.stroke();
        for (let j = 0; j < 6; j++) {
          const direction = i % 2 === 0 ? 1 : -1;
          const a = (j / 6) * Math.PI * 2 + t * direction;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * (r + 50), cy + Math.sin(a) * (r + 50));
          ctx.globalAlpha = 0.02;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
      ctx.restore();
    };

    const drawGeometry = () => {
      if (theme === "persia") drawPersianGeometry();
      else if (theme === "egypt") drawEgyptGeometry();
      else if (theme === "greek") drawGreekGeometry();
      else drawHomeGeometry();
    };

    const drawParticles = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        p.pulse += 0.02;
        const alpha = p.o * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${config.particleColor},${alpha})`;
        ctx.fill();
      });

      if (config.lines) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${config.particleColor},${(1 - d / 120) * 0.08})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      drawBg();
      drawNebula();
      drawGeometry();
      drawParticles();
      frame = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [theme]);

  return <canvas className="bg-canvas" ref={canvasRef} />;
}
