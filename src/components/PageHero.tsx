import type { ReactNode } from "react";
import { PlateCorners, type Civ } from "../art/core";
import { Halo, HeroCenterpiece } from "../art/emblems";

interface Props { civ: Civ; eyebrow: string; title: string; tagline: string; origin: string; extra?: ReactNode }

/** Shared hero: sacred-geometry halo + civ centrepiece + title + "Before the First God" tracing board. */
export function PageHero({ civ, eyebrow, title, tagline, origin, extra }: Props) {
  return (
    <header className={`page-hero hero-${civ}`} data-civ={civ}>
      <div className="hero-halo-wrap"><Halo civ={civ} /></div>
      <p className="eyebrow reveal">{eyebrow}</p>
      <div className="hero-art reveal"><HeroCenterpiece civ={civ} /></div>
      <h1 className="hero-title reveal">{title}</h1>
      <p className="hero-tagline reveal">{tagline}</p>
      {extra}
      <section className="origin reveal" aria-labelledby={`origin-${civ}`}>
        <PlateCorners civ={civ} />
        <h2 id={`origin-${civ}`} className="origin-label">Before the First God</h2>
        <p className="origin-body">{origin}</p>
      </section>
    </header>
  );
}
