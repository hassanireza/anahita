import type { ReactNode } from "react";

/* ---------- Egyptian cosmic-cycle sigils (48 x 48) ---------- */
function Sig({ children }: { children: ReactNode }) {
  return <g className="sigil">{children}</g>;
}

const CYCLE_SIGILS: Record<string, JSX.Element> = {
  Khepri: (
    <Sig>
      <circle cx="24" cy="11" r="5.5" fill="url(#g-sun)" />
      <path d="M24 3v-1M16.5 6l-1-1M31.5 6l1-1" className="a-line a-thin" />
      <ellipse cx="24" cy="30" rx="10" ry="12" className="a-line" />
      <path d="M24 18v24M14.5 27q9.5 5 19 0" className="a-line a-thin" />
      <path d="M14 22 8 18M34 22l6-4M14 33l-6 4M34 33l6 4M18 18.5l-1-3M30 18.5l1-3" className="a-line" />
    </Sig>
  ),
  Ra: (
    <Sig>
      <circle cx="24" cy="24" r="9" fill="url(#g-sun)" />
      <circle cx="24" cy="24" r="12.5" className="a-line a-thin" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <path key={i} d={`M${24 + Math.cos(a) * 16} ${24 + Math.sin(a) * 16}L${24 + Math.cos(a) * 21} ${24 + Math.sin(a) * 21}`} className="a-line" />;
      })}
    </Sig>
  ),
  Atum: (
    <Sig>
      <path d="M10 30a14 14 0 0 1 28 0Z" fill="url(#g-sun)" opacity=".9" />
      <path d="M4 30h40" className="a-line" />
      <path d="M8 35h32M14 40h20" className="a-line a-thin" />
      <path d="M24 8v4M10 14l3 3M38 14l-3 3" className="a-line a-thin" />
    </Sig>
  ),
  Nun: (
    <Sig>
      <path d="M4 16q5-5 10 0t10 0 10 0 10 0" className="a-line" />
      <path d="M4 25q5-5 10 0t10 0 10 0 10 0" className="a-line" opacity=".8" />
      <path d="M4 34q5-5 10 0t10 0 10 0 10 0" className="a-line" opacity=".6" />
      <path d="M17 12q7-9 14 0" className="a-line a-thin" strokeDasharray="1 3" />
    </Sig>
  ),
  Osiris: (
    <Sig>
      <rect x="20" y="8" width="8" height="34" rx="1" className="a-line" />
      {[12, 18, 24, 30].map((y) => <path key={y} d={`M12 ${y}h24`} className="a-line" />)}
      <path d="M17 6q7-5 14 0" className="a-line" />
      <path d="M16 42h16" className="a-line" />
    </Sig>
  ),
  Horus: (
    <Sig>
      <path d="M5 24Q24 8 43 24Q24 38 5 24Z" className="a-line" />
      <circle cx="24" cy="23.5" r="6" fill="url(#g-sun)" />
      <circle cx="24" cy="23.5" r="2.4" fill="#0a0806" />
      <path d="M6 17Q24 4 42 17" className="a-line a-thin" />
      <path d="M20 31q-1 7-8 9M28 31q2 6 9 7q4 1 4-3" className="a-line" />
    </Sig>
  ),
};


/** Sigil as a <g> in a 48x48 box, for composing inside a parent SVG. */
export function SigilG({ name }: { name: string }) {
  return <>{CYCLE_SIGILS[name]}</>;
}
/** Standalone sigil for HTML contexts. */
export function SigilSvg({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" aria-hidden="true" focusable="false">
      {CYCLE_SIGILS[name]}
    </svg>
  );
}
