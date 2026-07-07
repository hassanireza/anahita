import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { CivilizationSymbol } from "../components/CivilizationSymbol";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { registry } from "../data/registry";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CARDS: Array<{
  to: string;
  symbolId: "persia" | "egypt" | "greek";
  className: string;
  label: string;
  title: string;
  description: string;
}> = [
  {
    to: "/persia",
    symbolId: "persia",
    className: "persia-card",
    label: "The Sacred Flame",
    title: "PERSIA",
    description:
      "A cosmic duality of light and darkness, truth and lie. Ahura Mazda and Angra Mainyu locked in an eternal moral war.",
  },
  {
    to: "/egypt",
    symbolId: "egypt",
    className: "egypt-card",
    label: "The Eternal Nile",
    title: "EGYPT",
    description:
      "The cycle of Ra's journey, Osiris's resurrection, and the cosmic order of Ma'at. Death reborn as life.",
  },
  {
    to: "/greek",
    symbolId: "greek",
    className: "greek-card",
    label: "Mount Olympus",
    title: "GREECE",
    description:
      "A divine royal family born from Chaos. From Titans to Olympians, a lineage of myth and power.",
  },
];

export function Home() {
  useScrollReveal();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".trinity-card"));
    const factors = [1, 0.7, 1.2];

    const handleMove = (event: MouseEvent) => {
      const rx = (event.clientX / window.innerWidth - 0.5) * 10;
      const ry = (event.clientY / window.innerHeight - 0.5) * 10;
      cards.forEach((card, i) => {
        const bg = card.querySelector<HTMLElement>(".card-bg");
        if (!bg) return;
        const factor = factors[i] ?? 1;
        bg.style.transform = `scale(1) translate(${rx * factor * 0.3}px, ${ry * factor * 0.3}px)`;
      });
    };

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  const totalDeities = registry.totalDeities;

  return (
    <>
      <BackgroundCanvas theme="home" />
      <main className="page-wrapper">
        <section className="home-hero">
          <p className="eyebrow reveal">The Sacred Archive of Divine Beings</p>
          <h1 className="reveal gold-shimmer">ANAHITA</h1>
          <p className="subtitle reveal">
            Where fire, sand, and marble converge. Three civilizations, one cosmos, {totalDeities} gods.
          </p>

          <div className="trinity-nav reveal" ref={cardsRef}>
            {CARDS.map((card) => (
              <Link key={card.to} to={card.to} className={`trinity-card ${card.className}`} tabIndex={0}>
                <div className="card-bg"></div>
                <div className="overlay"></div>
                <div className="card-content">
                  <CivilizationSymbol id={card.symbolId} />
                  <p className="region-label">{card.label}</p>
                  <h2>{card.title}</h2>
                  <p className="desc">{card.description}</p>
                  <span className="enter-arrow">Enter {ARROW}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="ornament-row reveal">
            <div className="ornament-line"></div>
            <span>Three Civilizations</span>
            <div className="ornament-line right"></div>
            <span>One Archive</span>
            <div className="ornament-line"></div>
          </div>
        </section>

        <section className="home-closing-blurb">
          <p className="reveal home-closing-text">
            Before time was measured, before empires rose and fell, humanity looked skyward and gave names to
            the forces that shaped existence. This is their story, told through the divine beings they
            created, feared, and worshipped.
          </p>
        </section>
      </main>
    </>
  );
}
