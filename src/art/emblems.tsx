import type { Civ } from "./core";
import { star8 } from "./geometry";

/* ---------- procedural wing feathers (keeps the SVG small & consistent) ---------- */
const feather = (len: number, w: number) =>
  `M0 0C${(len * 0.18).toFixed(1)} ${-w} ${(len * 0.62).toFixed(1)} ${(-w * 1.15).toFixed(1)} ${len} 0C${(len * 0.62).toFixed(1)} ${(w * 1.15).toFixed(1)} ${(len * 0.18).toFixed(1)} ${w} 0 0Z`;

interface Tier { n: number; len: number; w: number; a0: number; a1: number; dy: number; fill: string }

function Wing({ rx, ry, tiers, className = "" }: { rx: number; ry: number; tiers: Tier[]; className?: string }) {
  return (
    <g className={className}>
      {[...tiers].reverse().map((t, ti) =>
        Array.from({ length: t.n }, (_, i) => {
          const a = t.a0 + ((t.a1 - t.a0) * i) / (t.n - 1);
          const len = t.len * (1 - i * 0.04);
          return (
            <path
              key={`${ti}-${i}`}
              d={feather(len, t.w)}
              fill={t.fill}
              stroke="#0a0806"
              strokeWidth=".7"
              transform={`translate(${rx} ${ry + t.dy}) rotate(${a.toFixed(1)})`}
            />
          );
        })
      )}
    </g>
  );
}

const mirror = "translate(240 0) scale(-1 1)";

/* ---------- PERSIA: winged sun-disc crest (Achaemenid royal tradition) ---------- */
export function PersiaCrest({ className = "" }: { className?: string }) {
  const tiers: Tier[] = [
    { n: 7, len: 94, w: 5.2, a0: -27, a1: -4, dy: 0, fill: "url(#g-gold)" },
    { n: 6, len: 76, w: 5, a0: -13, a1: 9, dy: 9, fill: "#c9a84c" },
    { n: 5, len: 58, w: 4.6, a0: -1, a1: 19, dy: 18, fill: "#8a6820" },
  ];
  return (
    <svg className={`crest crest-persia ${className}`} viewBox="0 0 240 150" fill="none" role="img" aria-label="Winged sun-disc of Persia">
      <circle cx="120" cy="70" r="48" fill="url(#g-halo)" className="crest-glow" />
      <g className="wing wing-r"><Wing rx={138} ry={64} tiers={tiers} /></g>
      <g transform={mirror}><g className="wing wing-l"><Wing rx={138} ry={64} tiers={tiers} /></g></g>
      {[76, 90, 104].map((a) => (
        <path key={a} d={feather(52, 6.5)} fill={a === 90 ? "url(#g-gold)" : "#a87d2a"} stroke="#0a0806" strokeWidth=".7" transform={`translate(120 88) rotate(${a})`} />
      ))}
      <path d="M108 90C94 92 88 104 76 110M132 90C146 92 152 104 164 110" className="a-line" />
      <circle cx="120" cy="68" r="23" className="a-line" />
      <circle cx="120" cy="68" r="19.5" className="a-line a-thin" strokeDasharray="1.2 2.4" />
      <circle cx="120" cy="68" r="15" fill="url(#g-sun)" className="crest-disc" />
      <polygon points={star8(120, 68, 10, 4.2)} fill="#0a0806" opacity=".38" className="crest-star" />
      <circle cx="120" cy="68" r="2.4" fill="#fff3c4" />
    </svg>
  );
}

/* ---------- EGYPT: winged sun with ankh, lapis / gold / carnelian pinions ---------- */
export function EgyptCrest({ className = "" }: { className?: string }) {
  const tiers: Tier[] = [
    { n: 8, len: 98, w: 4.2, a0: -7, a1: 12, dy: -6, fill: "url(#g-lapis)" },
    { n: 7, len: 84, w: 4.2, a0: 2, a1: 21, dy: 4, fill: "url(#g-gold)" },
    { n: 6, len: 64, w: 4, a0: 14, a1: 35, dy: 14, fill: "#b3341f" },
  ];
  return (
    <svg className={`crest crest-egypt ${className}`} viewBox="0 0 240 150" fill="none" role="img" aria-label="Winged sun of Egypt">
      <circle cx="120" cy="66" r="50" fill="url(#g-halo)" className="crest-glow" />
      <g className="wing wing-r"><Wing rx={136} ry={62} tiers={tiers} /></g>
      <g transform={mirror}><g className="wing wing-l"><Wing rx={136} ry={62} tiers={tiers} /></g></g>
      <circle cx="120" cy="64" r="24" className="a-line" />
      <circle cx="120" cy="64" r="17" fill="url(#g-sun)" className="crest-disc" />
      <circle cx="120" cy="64" r="6" fill="#fff3c4" opacity=".85" />
      <path d="M99 70c-9 1-9-14 0-13M141 70c9 1 9-14 0-13" className="a-line" />
      <g className="a-line">
        <ellipse cx="120" cy="102" rx="7" ry="9.5" />
        <path d="M120 111.5V142M107 120h26" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

/* ---------- GREECE: laurel wreath around Zeus' thunderbolt ---------- */
export function GreekCrest({ className = "" }: { className?: string }) {
  const leaves: JSX.Element[] = [];
  const cx = 120, cy = 76, R = 52;
  for (let i = 0; i < 11; i++) {
    const t = ((100 + i * 14) * Math.PI) / 180;
    const x = cx + R * Math.cos(t), y = cy + R * Math.sin(t);
    const tangent = (t * 180) / Math.PI + 90;
    for (const side of [-1, 1]) {
      leaves.push(
        <path
          key={`${i}-${side}`}
          d="M0 0C4-6 13-6 18 0C13 6 4 6 0 0Z"
          fill={side === 1 ? "url(#g-aegean)" : "#7fa3c6"}
          stroke="#0a0806"
          strokeWidth=".6"
          transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(tangent + side * 38).toFixed(1)}) scale(${(1 - i * 0.03).toFixed(2)})`}
        />
      );
    }
  }
  return (
    <svg className={`crest crest-greek ${className}`} viewBox="0 0 240 150" fill="none" role="img" aria-label="Laurel wreath and thunderbolt of Greece">
      <circle cx="120" cy="76" r="54" fill="url(#g-halo)" className="crest-glow" />
      <g>{leaves}</g>
      <g transform="translate(240 0) scale(-1 1)">{leaves}</g>
      <path d="M104 132q16 10 32 0" className="a-line" />
      <path d="M128 40 104 82h15l-10 36 30-46h-15l10-32Z" fill="url(#g-gold)" stroke="#0a0806" strokeWidth=".8" className="crest-bolt" />
      <path d="M96 128l-14 12 18-3zM144 128l14 12-18-3z" fill="#7fa3c6" opacity=".8" />
    </svg>
  );
}

export function Crest({ civ, className }: { civ: Civ; className?: string }) {
  return civ === "persia" ? <PersiaCrest className={className} /> : civ === "egypt" ? <EgyptCrest className={className} /> : <GreekCrest className={className} />;
}

/* ---------- Sacred-geometry halo used behind every hero ---------- */
const HALO: Record<Civ | "lodge", { n: number; k: number; rays: number }> = {
  persia: { n: 8, k: 3, rays: 16 },
  egypt: { n: 12, k: 5, rays: 36 },
  greek: { n: 5, k: 2, rays: 12 },
  lodge: { n: 6, k: 2, rays: 24 },
};

export function Halo({ civ, className = "" }: { civ: Civ | "lodge"; className?: string }) {
  const { n, k, rays } = HALO[civ];
  const verts = Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n - Math.PI / 2;
    return [300 + Math.cos(a) * 232, 300 + Math.sin(a) * 232];
  });
  const seen = new Set<number>();
  let d = "";
  for (let s = 0; s < n; s++) {
    if (seen.has(s)) continue;
    let i = s;
    let first = true;
    do {
      seen.add(i);
      d += `${first ? "M" : "L"}${verts[i][0].toFixed(1)} ${verts[i][1].toFixed(1)}`;
      first = false;
      i = (i + k) % n;
    } while (i !== s);
    d += "Z";
  }
  const petals = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3;
    return <circle key={i} cx={300 + Math.cos(a) * 62} cy={300 + Math.sin(a) * 62} r="62" />;
  });
  return (
    <svg className={`halo halo-${civ} ${className}`} viewBox="0 0 600 600" fill="none" aria-hidden="true" focusable="false">
      <circle cx="300" cy="300" r="292" className="a-line a-thin" />
      <g className="halo-ring halo-cw">
        <circle cx="300" cy="300" r="278" className="a-line" strokeWidth="5" strokeDasharray={`1.4 ${((2 * Math.PI * 278) / (rays * 2) - 1.4).toFixed(2)}`} />
      </g>
      <g className="halo-ring halo-ccw"><path d={d} className="a-line a-thin" /></g>
      <circle cx="300" cy="300" r="196" className="a-line a-thin" />
      <circle cx="300" cy="300" r="186" className="a-line a-thin" strokeDasharray="2 8" opacity=".7" />
      <g className="halo-ring halo-cw slow a-line a-thin" opacity=".55">{petals}<circle cx="300" cy="300" r="124" /></g>
    </svg>
  );
}

/* ---------- PERSIA hero centrepiece: the Atash (sacred fire altar) ---------- */
export function FireAltar({ className = "" }: { className?: string }) {
  return (
    <svg className={`fire-altar ${className}`} viewBox="0 0 140 196" fill="none" role="img" aria-label="Sacred fire altar">
      <ellipse cx="70" cy="120" rx="58" ry="62" fill="url(#g-halo)" className="crest-glow" />
      <g className="flame flame-a"><path d="M70 14C84 44 106 60 102 94c-3 24-18 36-32 36S41 118 38 94C35 64 58 50 70 14Z" fill="url(#g-ember)" /></g>
      <g className="flame flame-b"><path d="M70 48c10 20 24 30 22 52-2 16-12 24-22 24s-20-8-22-24c-2-22 12-32 22-52Z" fill="#f0a838" /></g>
      <g className="flame flame-c"><path d="M70 82c6 12 14 18 13 31-1 9-7 14-13 14s-12-5-13-14c-1-13 7-19 13-31Z" fill="#fff0b8" /></g>
      {[[40, 70], [102, 60], [58, 30], [86, 36]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#f0c25a" className="spark" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      <path d="M40 130h60l-8 16H48Z" fill="url(#g-gold)" />
      <path d="M60 146h20v18H60Z" fill="#8a6820" />
      <rect x="50" y="164" width="40" height="7" fill="url(#g-gold)" />
      <rect x="42" y="171" width="56" height="7" fill="#a87d2a" />
      <rect x="34" y="178" width="72" height="8" fill="#6d5016" />
      <path d="M52 134h36M62 150v10M78 150v10" stroke="#0a0806" strokeOpacity=".45" strokeWidth=".8" />
    </svg>
  );
}

/* ---------- EGYPT hero centrepiece: the Akhet (sun between two horizons) ---------- */
export function Akhet({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 28 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 28;
    return <path key={i} d={`M${300 + Math.cos(a) * 62} ${118 + Math.sin(a) * 62}L${300 + Math.cos(a) * 96} ${118 + Math.sin(a) * 96}`} />;
  });
  return (
    <svg className={`akhet ${className}`} viewBox="0 0 600 180" fill="none" role="img" aria-label="Sun rising between two horizon pyramids">
      <circle cx="300" cy="118" r="110" fill="url(#g-halo)" className="crest-glow" />
      <g className="akhet-rays a-line a-thin">{rays}</g>
      <circle cx="300" cy="118" r="52" fill="url(#g-sun)" className="akhet-sun" />
      <circle cx="300" cy="118" r="58" className="a-line a-thin" />
      <path d="M20 160 130 62l110 98Z" fill="#14100a" stroke="#c9a84c" strokeOpacity=".7" />
      <path d="M130 62l110 98H130Z" fill="#0c0905" />
      <path d="M360 160 470 62l110 98Z" fill="#14100a" stroke="#c9a84c" strokeOpacity=".7" />
      <path d="M470 62l110 98H470Z" fill="#0c0905" />
      <path d="M130 62V160M470 62V160" stroke="#c9a84c" strokeOpacity=".3" />
      <path className="akhet-nile" d="M0 168q25-8 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0" stroke="#3aa6a0" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M0 176q25-8 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0" stroke="#3aa6a0" strokeOpacity=".4" strokeWidth="1" />
    </svg>
  );
}

/* ---------- GREECE hero centrepiece: Doric temple facade ---------- */
export function TempleFacade({ className = "" }: { className?: string }) {
  const xs = [78, 142, 206, 270, 334, 398].map((x) => x - 20);
  return (
    <svg className={`temple ${className}`} viewBox="0 0 440 220" fill="none" role="img" aria-label="Doric temple of Olympus">
      <ellipse cx="220" cy="110" rx="200" ry="100" fill="url(#g-halo)" className="crest-glow" />
      <path d="M26 76 220 24l194 52Z" fill="#101624" stroke="#a8c4e0" strokeOpacity=".8" />
      <path d="M52 72 220 30l168 42" stroke="#a8c4e0" strokeOpacity=".3" />
      <path className="temple-bolt" d="M226 40 210 62h10l-8 18 22-26h-10Z" fill="url(#g-gold)" />
      <rect x="22" y="76" width="396" height="16" fill="#101624" stroke="#a8c4e0" strokeOpacity=".7" />
      <g stroke="#a8c4e0" strokeOpacity=".4">{Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${36 + i * 18} 78v12`} />)}</g>
      {xs.map((x, i) => (
        <g key={x} className="temple-col" style={{ ["--i" as string]: i }}>
          <rect x={x - 3} y="92" width="46" height="7" fill="#1a2234" stroke="#a8c4e0" strokeOpacity=".6" />
          <path d={`M${x + 3} 99H${x + 37}L${x + 34} 176H${x + 6}Z`} fill="#141b2c" stroke="#a8c4e0" strokeOpacity=".55" />
          <path d={`M${x + 12} 99l-1.4 77M${x + 20} 99v77M${x + 28} 99l1.4 77`} stroke="#a8c4e0" strokeOpacity=".28" />
        </g>
      ))}
      <rect x="16" y="176" width="408" height="8" fill="#1a2234" stroke="#a8c4e0" strokeOpacity=".6" />
      <rect x="8" y="184" width="424" height="9" fill="#141b2c" stroke="#a8c4e0" strokeOpacity=".5" />
      <rect x="0" y="193" width="440" height="10" fill="#101624" stroke="#a8c4e0" strokeOpacity=".4" />
    </svg>
  );
}

export function HeroCenterpiece({ civ }: { civ: Civ }) {
  return civ === "persia" ? <FireAltar /> : civ === "egypt" ? <Akhet /> : <TempleFacade />;
}
