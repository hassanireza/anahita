import { Link } from "react-router-dom";
import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { Footer } from "../components/Footer";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { registry } from "../data/registry";
import { imageProps } from "../utils/assetUrl";
import { Divider, Icon, LogoMark, OrderGlyph, Pillar, type Civ } from "../art/core";
import { Crest, Halo } from "../art/emblems";

const PORTALS: Array<{ to: string; civ: Civ; pillar: string; order: "ionic" | "doric" | "corinthian"; label: string; title: string; desc: string; image: string; alt: string }> = [
  { to: "/persia", civ: "persia", pillar: "Wisdom", order: "ionic", label: "The Sacred Flame", title: "PERSIA", desc: "A cosmic duality of light and darkness, truth and lie. Ahura Mazda and Angra Mainyu locked in an eternal moral war.", image: "/assets/images/persianGods/ahura-mazda.webp", alt: "Ahura Mazda beside the sacred flame" },
  { to: "/egypt", civ: "egypt", pillar: "Strength", order: "doric", label: "The Eternal Nile", title: "EGYPT", desc: "The cycle of Ra's journey, Osiris's resurrection, and the cosmic order of Ma'at. Death reborn as life.", image: "/assets/images/egyptionGods/ra.webp", alt: "Ra, the falcon-headed sun god" },
  { to: "/greek", civ: "greek", pillar: "Beauty", order: "corinthian", label: "Mount Olympus", title: "GREECE", desc: "A divine royal family born from Chaos. From Titans to Olympians, a lineage of myth and power.", image: "/assets/images/greekGods/zeus.webp", alt: "Zeus enthroned amid lightning" },
];

export function Home() {
  useScrollReveal();
  const groups = registry.all.reduce((n, p) => n + p.groups.length, 0);

  return (
    <>
      <BackgroundCanvas theme="home" />
      <main className="page-wrapper home">
        <section className="home-hero">
          <Pillar className="hero-pillar left" />
          <Pillar className="hero-pillar right" />
          <div className="hero-halo-wrap"><Halo civ="lodge" /></div>
          <div className="hero-mark reveal"><LogoMark size={92} /></div>
          <p className="eyebrow reveal">The Sacred Archive of Divine Beings</p>
          <h1 className="home-title gold-shimmer reveal">ANAHITA</h1>
          <p className="home-subtitle reveal">
            Where fire, sand, and marble converge. Three civilizations, one cosmos, {registry.totalDeities} gods.
          </p>
          <Divider variant="lodge" />
        </section>

        <section className="portals" aria-label="Choose a civilization">
          {PORTALS.map((p, i) => {
            const img = imageProps(p.image);
            return (
              <Link key={p.to} to={p.to} data-civ={p.civ} className={`portal portal-${p.civ} reveal`} style={{ ["--i" as string]: i, ["--ph" as string]: img.color }}>
                <img className="portal-img" src={img.src} srcSet={img.srcSet} sizes="(min-width:1000px) 380px, 92vw" width={img.width} height={img.height} alt={p.alt} loading="lazy" decoding="async" />
                <span className="portal-shade" aria-hidden="true" />
                <span className="portal-frame" aria-hidden="true" />
                <div className="portal-content">
                  <Crest civ={p.civ} className="portal-crest" />
                  <p className="portal-pillar"><OrderGlyph order={p.order} size={26} /> Pillar of {p.pillar}</p>
                  <p className="portal-label">{p.label}</p>
                  <h2>{p.title}</h2>
                  <p className="portal-desc">{p.desc}</p>
                  <span className="portal-enter">Enter <Icon name="arrow-right" size={14} /></span>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="lodge-stats reveal" aria-label="Archive at a glance">
          <div><b>{registry.totalDeities}</b><span>Deities</span></div>
          <div><b>3</b><span>Civilizations</span></div>
          <div><b>{groups}</b><span>Sacred orders</span></div>
        </section>

        <section className="home-closing">
          <Divider variant="lodge" />
          <p className="closing-text reveal">
            Before time was measured, before empires rose and fell, humanity looked skyward and gave names to
            the forces that shaped existence. This is their story, told through the divine beings they
            created, feared, and worshipped.
          </p>
          <div className="lodge-floor" aria-hidden="true" />
        </section>
      </main>
      <Footer credit="ANAHITA · GODS OF THE ANCIENT WORLD" />
    </>
  );
}
