import type { CSSProperties } from "react";
import { star8 } from "./geometry";

export type Civ = "persia" | "egypt" | "greek";

/* ------------------------------------------------------------------ */
/*  Shared sprite: gradients + corner symbols. Rendered once in <App>.  */
/* ------------------------------------------------------------------ */
export function ArtSprite() {
  return (
    <svg className="art-sprite" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7e9bd" />
          <stop offset=".35" stopColor="#e8d08a" />
          <stop offset=".65" stopColor="#c9a84c" />
          <stop offset="1" stopColor="#7d5d1a" />
        </linearGradient>
        <linearGradient id="g-gold-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6820" />
          <stop offset=".5" stopColor="#f0dc9a" />
          <stop offset="1" stopColor="#8a6820" />
        </linearGradient>
        <linearGradient id="g-ember" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#b3341f" />
          <stop offset=".55" stopColor="#e8a33d" />
          <stop offset="1" stopColor="#fff0b8" />
        </linearGradient>
        <linearGradient id="g-lapis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fd0c8" />
          <stop offset=".6" stopColor="#2a8a92" />
          <stop offset="1" stopColor="#0f4a56" />
        </linearGradient>
        <linearGradient id="g-aegean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f5fa" />
          <stop offset=".5" stopColor="#a8c4e0" />
          <stop offset="1" stopColor="#4a7aa6" />
        </linearGradient>
        <radialGradient id="g-sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".45" stopColor="#f0c25a" />
          <stop offset="1" stopColor="#b0701a" />
        </radialGradient>
        <radialGradient id="g-halo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#e8d08a" stopOpacity=".5" />
          <stop offset="1" stopColor="#e8d08a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g-eclipse" cx=".5" cy=".5" r=".5">
          <stop offset=".62" stopColor="#0a0403" />
          <stop offset=".8" stopColor="#b3341f" stopOpacity=".9" />
          <stop offset="1" stopColor="#b3341f" stopOpacity="0" />
        </radialGradient>

        {/* Corner ornaments, drawn for the top-left corner (24 x 24) */}
        <symbol id="corner-persia" viewBox="0 0 24 24">
          <path d="M1 23V7Q1 1 7 1H23" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4.5 20V8.5Q4.5 4.5 8.5 4.5H20" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".6" />
          <g fill="currentColor">
            <circle cx="7.5" cy="7.5" r="1.6" />
            <circle cx="7.5" cy="3.7" r=".9" />
            <circle cx="3.7" cy="7.5" r=".9" />
            <circle cx="11.3" cy="7.5" r=".9" />
            <circle cx="7.5" cy="11.3" r=".9" />
          </g>
        </symbol>
        <symbol id="corner-egypt" viewBox="0 0 24 24">
          <path d="M1 23V10H5V6H9V2H12V1H23" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="miter" />
          <path d="M4 20V13H8V9H12V5H20" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".6" />
          <path d="M3.4 3.4L5.6 5.6 3.4 7.8 1.2 5.6Z" fill="currentColor" transform="translate(1.5 -1.2)" />
        </symbol>
        <symbol id="corner-greek" viewBox="0 0 24 24">
          <path d="M1 23V1H23" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 19V5H19V11H11V8H15" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".75" />
        </symbol>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand mark: compass + square + eight-pointed star in a ring         */
/* ------------------------------------------------------------------ */


export function LogoMark({ size = 40, animated = true, className = "" }: { size?: number; animated?: boolean; className?: string }) {
  return (
    <svg
      className={`logo-mark ${animated ? "is-animated" : ""} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="30" className="a-line a-thin" />
      <circle cx="32" cy="32" r="27" className="a-line a-thin" opacity=".45" strokeDasharray="1 3" />
      <path d="M9 47 32 24l23 23" className="a-line" strokeWidth="2.4" />
      <path d="M15.5 47 32 30.5 48.5 47" className="a-line a-thin" opacity=".55" />
      <g className="logo-compass">
        <path d="M32 11.5 21 53.5M32 11.5l11 42" className="a-line" strokeWidth="1.8" />
        <path d="M21 53.5l-.9 3.4M43 53.5l.9 3.4" className="a-line" strokeWidth="1.4" />
        <path d="M26 35q6 3.6 12 0" className="a-line a-thin" />
        <circle cx="32" cy="10" r="2.7" className="a-line" fill="#0a0806" />
        <path d="M32 7.3V4.6" className="a-line" />
      </g>
      <polygon className="logo-star" points={star8(32, 39, 5.4, 2.1)} fill="url(#g-gold)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  UI icon set: one consistent 1.5px line language                     */
/* ------------------------------------------------------------------ */
const ICONS = {
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.3 15.3 20 20",
  heart: "M12 20.5S4 15.6 3 9.6C2.4 6.2 5.3 4 8 5.3c1.6.8 3 2 4 3.6 1-1.6 2.4-2.8 4-3.6 2.7-1.3 5.6.9 5 4.3-1 6-9 10.9-9 10.9Z",
  close: "M6 6l12 12M18 6 6 18",
  "arrow-right": "M4 12h16M14 6l6 6-6 6",
  "arrow-left": "M20 12H4M10 6l-6 6 6 6",
  "arrow-up": "M12 20V4M6 10l6-6 6 6",
  chevron: "M6 9l6 6 6-6",
  dice: "M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3ZM8.5 8.5h.01M12 12h.01M15.5 15.5h.01M15.5 8.5h.01M8.5 15.5h.01",
  book: "M4 5.5C6.5 4.4 9.5 4.4 12 6c2.5-1.6 5.5-1.6 8-.5V19c-2.5-1.1-5.5-1.1-8 .5-2.5-1.6-5.5-1.6-8-.5ZM12 6v13.5",
} as const;
export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 18, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Plate corners (four <use> refs to sprite symbols)                   */
/* ------------------------------------------------------------------ */
export function PlateCorners({ civ }: { civ: Civ }) {
  return (
    <span className="plate-corners" aria-hidden="true">
      {["tl", "tr", "br", "bl"].map((p) => (
        <svg key={p} className={`corner corner-${p}`} viewBox="0 0 24 24" width="22" height="22">
          <use href={`#corner-${civ}`} />
        </svg>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section divider, drawn on reveal. Centre motif is civ-specific.     */
/* ------------------------------------------------------------------ */
export function Divider({ variant = "lodge", className = "" }: { variant?: Civ | "lodge"; className?: string }) {
  return (
    <div className={`divider divider-${variant} reveal ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 44" preserveAspectRatio="xMidYMid meet" fill="none">
        <path className="div-line" pathLength={1} d="M16 22H246" />
        <path className="div-line" pathLength={1} d="M584 22H354" />
        <path d="M16 22l5-4 5 4-5 4zM584 22l-5-4-5 4 5 4z" className="a-fill" />
        <g transform="translate(300 22)" className="div-center">
          {variant === "persia" && (
            <>
              <polygon points={star8(0, 0, 17, 7)} fill="url(#g-gold)" />
              <circle r="21" className="a-line a-thin" />
              <circle r="3" fill="#0a0806" />
              <path d="M-34 0l7-5v10zM34 0l-7-5v10z" className="a-fill" />
            </>
          )}
          {variant === "egypt" && (
            <>
              <path d="M-19 0Q0-15 19 0Q0 15-19 0Z" className="a-line" />
              <circle r="5.4" fill="url(#g-sun)" />
              <circle r="1.8" fill="#0a0806" />
              <path d="M-5 9Q-6 16-12 18M6 9q3 8 10 8" className="a-line a-thin" />
              <path d="M-34 0h10M24 0h10" className="a-line a-thin" />
            </>
          )}
          {variant === "greek" && (
            <>
              <path d="M-20 14V-14h40V8H-8V-4H8V0" className="a-line" />
              <path d="M-32 0h8M24 0h8" className="a-line a-thin" />
              <circle cx="0" cy="-1" r="1.6" className="a-fill" />
            </>
          )}
          {variant === "lodge" && (
            <>
              <path d="M-16 11 0-5l16 16" className="a-line" strokeWidth="2" />
              <path d="M0-16-8 12M0-16l8 28" className="a-line a-thin" />
              <polygon points={star8(0, 3, 5, 2)} fill="url(#g-gold)" />
              <circle cy="-17" r="2" className="a-line a-thin" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Masonic pillars (Boaz / Jachin): fluted shaft, bowl, celestial globe */
/* ------------------------------------------------------------------ */
export function Pillar({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const flutes = Array.from({ length: 5 }, (_, i) => 18 + i * 11);
  return (
    <svg className={`pillar ${className}`} style={style} viewBox="0 0 80 420" fill="none" aria-hidden="true" focusable="false">
      {/* globe */}
      <g className="pillar-globe">
        <circle cx="40" cy="30" r="22" fill="url(#g-halo)" />
        <circle cx="40" cy="30" r="14" className="a-line" />
        <ellipse className="globe-meridian" cx="40" cy="30" rx="14" ry="14" />
        <ellipse className="globe-meridian m2" cx="40" cy="30" rx="14" ry="14" />
        <path d="M26 30h28M28.5 22h23M28.5 38h23" className="a-line a-thin" />
      </g>
      {/* capital: lily bowl + net band */}
      <path d="M22 60c0-6 8-9 18-9s18 3 18 9l-3 14H25Z" fill="url(#g-gold)" opacity=".92" />
      <path d="M25 74h30M27 66h26" stroke="#0a0806" strokeWidth=".8" opacity=".5" />
      <path d="M34 60q6-8 12 0" stroke="#0a0806" strokeWidth=".8" opacity=".5" />
      <rect x="17" y="74" width="46" height="7" rx="1" fill="url(#g-gold)" />
      {/* shaft */}
      <rect x="22" y="81" width="36" height="288" fill="#14100a" stroke="#c9a84c" strokeOpacity=".55" strokeWidth="1" />
      {flutes.map((x) => (
        <path key={x} d={`M${x + 6} 85V365`} stroke="#c9a84c" strokeOpacity={x % 22 ? 0.18 : 0.3} strokeWidth="1" />
      ))}
      <path d="M22 130h36M22 320h36" stroke="#c9a84c" strokeOpacity=".5" strokeWidth="1.4" />
      {/* base */}
      <rect x="17" y="369" width="46" height="8" rx="1" fill="url(#g-gold)" />
      <rect x="10" y="377" width="60" height="10" rx="1" fill="url(#g-gold)" opacity=".85" />
      <rect x="4" y="387" width="72" height="12" fill="#14100a" stroke="#c9a84c" strokeOpacity=".5" />
    </svg>
  );
}

/** Small capital glyphs for the three orders: Ionic / Doric / Corinthian. */
export function OrderGlyph({ order, size = 36 }: { order: "ionic" | "doric" | "corinthian"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" className="order-glyph">
      <rect x="6" y="6" width="36" height="4" className="a-line" />
      {order === "ionic" && (
        <>
          <path d="M8 10q0 12 8 12 5 0 5-5t-5-4" className="a-line" />
          <path d="M40 10q0 12-8 12-5 0-5-5t5-4" className="a-line" />
          <path d="M16 12h16" className="a-line a-thin" />
          <path d="M18 26h12v14H18z" className="a-line a-thin" opacity=".7" />
        </>
      )}
      {order === "doric" && (
        <>
          <path d="M10 10q0 7 6 8h16q6-1 6-8" className="a-line" />
          <path d="M16 18l-1 22M32 18l1 22M24 18v22" className="a-line a-thin" opacity=".7" />
        </>
      )}
      {order === "corinthian" && (
        <>
          <path d="M12 10q-2 14 12 16 14-2 12-16" className="a-line" />
          <path d="M16 24q-6-4-4-10M32 24q6-4 4-10M24 26V14M20 20q-3-4-2-9M28 20q3-4 2-9" className="a-line a-thin" />
          <path d="M18 26h12v14H18z" className="a-line a-thin" opacity=".7" />
        </>
      )}
    </svg>
  );
}

/** Compact ornamental rule used inside dialogs and cards. */
export function DividerLite() {
  return (
    <div className="divider-lite" aria-hidden="true">
      <span />
      <svg width="22" height="22" viewBox="0 0 22 22"><polygon points={star8(11, 11, 10, 4)} fill="url(#g-gold)" /></svg>
      <span />
    </div>
  );
}
