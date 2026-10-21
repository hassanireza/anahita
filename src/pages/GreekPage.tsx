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
import { greek } from "../data/registry";
import type { EmblemId } from "../art/sigils";

const EMBLEMS: EmblemId[] = ["greek-chaos", "greek-titans", "greek-olympians", "greek-underworld"];
const NUMERALS = ["I", "II", "III", "IV"];

export function GreekPage() {
  const x = usePantheonExplorer(greek);
  const root = useRef<HTMLElement>(null);
  useScrollReveal([x.query, x.alignment, x.savedOnly]);
  useTilt(root);
  const empty = x.hasActiveFilter && x.totalMatches === 0;
  const shown = greek.groups.map((g, i) => ({ g, i, deities: x.byGroup.get(g.id) ?? [] })).filter((s) => s.deities.length > 0);

  return (
    <>
      <BackgroundCanvas theme="greek" />
      <main className="page-wrapper" ref={root} data-civ="greek">
        <PageHero civ="greek" eyebrow={greek.eyebrow} title={greek.title} tagline={greek.tagline} origin={greek.originStory} />

        <section className="block" aria-label="The generations of the gods">
          <SearchToolbar
            query={x.query} onQueryChange={x.setQuery} alignment={x.alignment} onAlignmentChange={x.setAlignment}
            alignments={["all"]} savedOnly={x.savedOnly} onSavedChange={x.setSavedOnly} savedCount={x.savedCount}
            onRandom={x.pickRandom} total={x.totalMatches} hasFilter={x.hasActiveFilter} placeholder="Search the Greek pantheon"
          />
          {empty && <p className="empty-state">No deities match. Try another name, role, or clear the filters.</p>}

          {shown.map(({ g, i, deities }, n) => {
            const [main, ...rest] = g.title.split(/\.\s+/);
            return (
              <div key={g.id} className="generation">
                {n > 0 && (
                  <div className="lineage reveal" aria-hidden="true">
                    <svg viewBox="0 0 24 110" width="24" height="110"><path className="div-line" pathLength={1} d="M12 0V84" /><path d="M12 108 5 94h14Z" className="a-fill" /></svg>
                    <span>Descended from</span>
                  </div>
                )}
                <SectionHead civ="greek" emblem={EMBLEMS[i] ?? "greek-olympians"} numeral={NUMERALS[i]} eyebrow={g.eyebrow} title={main} desc={rest.join(". ") || g.description || undefined} id={`gen-${g.id}`} />
                <div className="gen-grid">
                  {deities.map((d, k) => (
                    <DeityCard key={d.id} deity={d} civ="greek" index={k} layout="stack" isFavorite={x.isFavorite(d.id)} onToggleFavorite={x.toggleFavorite} onOpen={x.openDeity} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <DeityModal deity={x.activeDeity} civ="greek" list={x.visible} onClose={x.closeDeity} onSelect={x.openDeity}
        isFavorite={x.activeDeity ? x.isFavorite(x.activeDeity.id) : false} onToggleFavorite={x.toggleFavorite} />
      <Footer showBackLink credit="GREECE · MOUNT OLYMPUS" />
    </>
  );
}
