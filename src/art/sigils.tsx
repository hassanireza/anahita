import { star8 } from "./geometry";

/** Ma'at: the feather of truth over the scales. */
export function MaatFeather({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false" className="maat">
      <path d="M32 6C42 14 44 30 32 50 20 30 22 14 32 6Z" fill="url(#g-gold)" />
      <path d="M32 8v50" className="a-line" stroke="#0a0806" strokeWidth="1" />
      <path d="M32 18l-6 5M32 25l-7 5M32 32l-6 5M32 18l6 5M32 25l7 5M32 32l6 5" stroke="#0a0806" strokeWidth=".7" opacity=".6" />
      <path d="M18 58h28" className="a-line" />
    </svg>
  );
}

/* ---------- Group emblems (64 x 64) shown in every section header ---------- */
export type EmblemId =
  | "persia-duality" | "persia-yazata"
  | "egypt-cycle" | "egypt-pantheon"
  | "greek-chaos" | "greek-titans" | "greek-olympians" | "greek-underworld";

export function GroupEmblem({ id, size = 64 }: { id: EmblemId; size?: number }) {
  return (
    <svg className="group-emblem" width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" className="a-line a-thin" />
      <circle cx="32" cy="32" r="26.5" className="a-line a-thin" opacity=".4" strokeDasharray="1 3" />
      {id === "persia-duality" && (
        <>
          <circle cx="32" cy="32" r="15" fill="url(#g-sun)" />
          <path d="M32 17a15 15 0 0 1 0 30 11 15 0 0 0 0-30Z" fill="#0a0403" />
          <path d="M32 6v7M32 51v7M6 32h7M51 32h7" className="a-line" />
        </>
      )}
      {id === "persia-yazata" && (
        <>
          <polygon className="emblem-spin" points={star8(32, 32, 20, 8.5)} fill="url(#g-gold)" />
          <circle cx="32" cy="32" r="22" className="a-line a-thin" />
          <circle cx="32" cy="32" r="4.5" fill="#0a0806" />
        </>
      )}
      {id === "egypt-cycle" && (
        <>
          <circle cx="32" cy="32" r="14" className="a-line" />
          <circle cx="32" cy="32" r="6" fill="url(#g-sun)" />
          <path d="M32 12l3 6h-6zM32 52l3-6h-6zM12 32l6 3v-6zM52 32l-6 3v-6z" className="a-fill" />
        </>
      )}
      {id === "egypt-pantheon" && (
        <>
          <ellipse cx="32" cy="24" rx="8.5" ry="11" className="a-line" strokeWidth="2" />
          <path d="M32 35v20M21 41h22" className="a-line" strokeWidth="2.4" />
        </>
      )}
      {id === "greek-chaos" && (
        <path d="M32 32m0 0a3 3 0 0 1 6 0 8 8 0 0 1-16 0 13 13 0 0 1 26 0 18 18 0 0 1-36 0" className="a-line" strokeWidth="1.8" />
      )}
      {id === "greek-titans" && (
        <>
          <circle cx="32" cy="17" r="8" className="a-line" />
          <path d="M24 17h16M32 9v16M26 11q6 6 12 12" className="a-line a-thin" />
          <path d="M26 27v22M38 27v22M22 49h20" className="a-line" strokeWidth="2" />
        </>
      )}
      {id === "greek-olympians" && (
        <>
          <polygon className="emblem-spin" points={star8(32, 32, 22, 17)} fill="none" stroke="#c9a84c" strokeWidth="1" />
          <path d="M35 14 24 33h8l-5 17 14-21h-8Z" fill="url(#g-gold)" />
        </>
      )}
      {id === "greek-underworld" && (
        <>
          <path d="M32 10v44M24 10v12a8 8 0 0 0 16 0V10" className="a-line" strokeWidth="1.8" />
          <path d="M32 54l-4 3M32 54l4 3" className="a-line" />
        </>
      )}
    </svg>
  );
}

/* ---------- Persia duality axis ---------- */
export function LightFlame() {
  return (
    <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-label="Light" role="img">
      <path d="M20 4c5 8 12 12 11 20-1 8-6 12-11 12S10 32 9 24c-1-8 6-12 11-20Z" fill="url(#g-ember)" className="flame-a" />
      <path d="M20 18c3 5 6 7 6 11 0 4-3 6-6 6s-6-2-6-6c0-4 3-6 6-11Z" fill="#fff0b8" />
    </svg>
  );
}
export function DarkEclipse() {
  return (
    <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-label="Darkness" role="img">
      <circle cx="20" cy="20" r="19" fill="url(#g-eclipse)" />
      <circle cx="20" cy="20" r="11" fill="#0a0403" stroke="#b3341f" strokeWidth="1" />
      <path d="M8 8 32 32M32 8 8 32" stroke="#b3341f" strokeWidth=".8" opacity=".6" />
    </svg>
  );
}

/* ---------- 404: the keystone is missing from the arch ---------- */
export function LostKeystone() {
  return (
    <svg className="lost-keystone" viewBox="0 0 320 240" fill="none" aria-hidden="true" focusable="false">
      <circle cx="160" cy="120" r="110" fill="url(#g-halo)" className="crest-glow" />
      <path d="M40 220V120a120 120 0 0 1 240 0v100" className="a-line" strokeWidth="2" />
      <path d="M62 220V122a98 98 0 0 1 196 0v98" className="a-line a-thin" />
      {Array.from({ length: 7 }, (_, i) => {
        const a = Math.PI + ((i + 1) * Math.PI) / 8;
        return <path key={i} d={`M${160 + Math.cos(a) * 98} ${122 + Math.sin(a) * 98}L${160 + Math.cos(a) * 120} ${120 + Math.sin(a) * 120}`} className="a-line a-thin" />;
      })}
      <path className="keystone" d="M146 6h28l8 34h-44Z" fill="url(#g-gold)" stroke="#0a0806" />
      <path d="M0 220h320" className="a-line" />
    </svg>
  );
}
