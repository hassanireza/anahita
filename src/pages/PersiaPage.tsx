import { useRef } from "react";
import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { DeityCard } from "../components/DeityCard";
import { DeityModal } from "../components/DeityModal";
import { SearchToolbar } from "../components/SearchToolbar";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { SectionHead } from "../components/SectionHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTilt } from "../hooks/useTilt";
import { usePantheonExplorer } from "../hooks/usePantheonExplorer";
import { persia } from "../data/registry";
import { Divider } from "../art/core";
import { DarkEclipse, LightFlame } from "../art/sigils";

export function PersiaPage() {
  const x = usePantheonExplorer(persia);
  const root = useRef<HTMLElement>(null);
  useScrollReveal([x.query, x.alignment, x.savedOnly]);
  useTilt(root);

  const [primal, yazata] = persia.groups;
  const primalList = x.byGroup.get(primal.id) ?? [];
  const good = primalList.filter((d) => d.alignment === "good");
  const evil = primalList.filter((d) => d.alignment === "evil");
  const yazatas = x.byGroup.get(yazata.id) ?? [];
  const common = { civ: "persia" as const, isFavorite: undefined as never, onToggleFavorite: x.toggleFavorite, onOpen: x.openDeity };
  const empty = x.hasActiveFilter && x.totalMatches === 0;

  return (
    <>
      <BackgroundCanvas theme="persia" />
      <main className="page-wrapper" ref={root} data-civ="persia">
        <PageHero civ="persia" eyebrow={persia.eyebrow} title={persia.title} tagline={persia.tagline} origin={persia.originStory} />

        <section className="block" aria-labelledby="duality-title">
          <SectionHead civ="persia" emblem="persia-duality" eyebrow={primal.eyebrow} title={primal.title} desc={primal.description} id="duality-title" />
          <SearchToolbar
            query={x.query} onQueryChange={x.setQuery} alignment={x.alignment} onAlignmentChange={x.setAlignment}
            alignments={["all", "good", "evil"]} savedOnly={x.savedOnly} onSavedChange={x.setSavedOnly} savedCount={x.savedCount}
            onRandom={x.pickRandom} total={x.totalMatches} hasFilter={x.hasActiveFilter} placeholder="Search the Persian pantheon"
          />
          {empty ? (
            <p className="empty-state">No deities match. Try another name, role, or clear the filters.</p>
          ) : (
            <div className="duality">
              {good.length > 0 && (
                <div className="side side-good">
                  <div className="side-intro reveal">
                    <span className="side-label"><LightFlame /> The Light · اهورامزدا</span>
                    <h3>AHURA MAZDA</h3>
                    <p>Lord of Wisdom, the Uncreated, Eternal Good</p>
                  </div>
                  {good.map((d, i) => <DeityCard key={d.id} deity={d} index={i} layout="side" {...common} isFavorite={x.isFavorite(d.id)} />)}
                </div>
              )}
              {good.length > 0 && evil.length > 0 && (
                <div className="axis" aria-hidden="true"><span className="axis-line" /><span className="axis-sigil"><LightFlame /></span><span className="axis-line" /><span className="axis-sigil"><DarkEclipse /></span><span className="axis-line" /></div>
              )}
              {evil.length > 0 && (
                <div className="side side-evil">
                  <div className="side-intro reveal">
                    <span className="side-label"><DarkEclipse /> The Darkness · اهریمن</span>
                    <h3>ANGRA MAINYU</h3>
                    <p>The Destructive Spirit, the Uncreated, Eternal Evil</p>
                  </div>
                  {evil.map((d, i) => <DeityCard key={d.id} deity={d} index={i} layout="side" reversed {...common} isFavorite={x.isFavorite(d.id)} />)}
                </div>
              )}
            </div>
          )}
        </section>

        {yazatas.length > 0 && (
          <section className="block" aria-labelledby="yazata-title">
            <Divider variant="persia" />
            <SectionHead civ="persia" emblem="persia-yazata" eyebrow={yazata.eyebrow} title={yazata.title} desc={yazata.description} id="yazata-title" />
            <div className="bento">
              {yazatas.map((d, i) => (
                <DeityCard key={d.id} deity={d} index={i} layout={i === 0 && yazatas.length > 3 ? "feature" : "stack"} {...common} isFavorite={x.isFavorite(d.id)} />
              ))}
            </div>
          </section>
        )}
      </main>

      <DeityModal deity={x.activeDeity} civ="persia" list={x.visible} onClose={x.closeDeity} onSelect={x.openDeity}
        isFavorite={x.activeDeity ? x.isFavorite(x.activeDeity.id) : false} onToggleFavorite={x.toggleFavorite} />
      <Footer showBackLink credit="PERSIA · THE SACRED FLAME" />
    </>
  );
}
