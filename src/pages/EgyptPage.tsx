import { useRef } from "react";
import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { DeityCard } from "../components/DeityCard";
import { DeityModal } from "../components/DeityModal";
import { SearchToolbar } from "../components/SearchToolbar";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { SectionHead } from "../components/SectionHead";
import { EgyptCycle } from "../components/EgyptCycle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTilt } from "../hooks/useTilt";
import { usePantheonExplorer } from "../hooks/usePantheonExplorer";
import { egypt } from "../data/registry";
import { Divider } from "../art/core";

const FRIEZE = "𓂀 𓋹 𓆣 𓇳 𓃭 𓅓 𓊽 𓏏 𓈖 𓁹 𓃠 𓅃 𓆓 𓇯 𓉐 𓂋 𓋴 𓌳 ";

export function EgyptPage() {
  const x = usePantheonExplorer(egypt);
  const root = useRef<HTMLElement>(null);
  useScrollReveal([x.query, x.alignment, x.savedOnly]);
  useTilt(root);
  const group = egypt.groups[0];
  const deities = x.byGroup.get(group.id) ?? [];
  const empty = x.hasActiveFilter && x.totalMatches === 0;

  return (
    <>
      <BackgroundCanvas theme="egypt" />
      <main className="page-wrapper" ref={root} data-civ="egypt">
        <PageHero civ="egypt" eyebrow={egypt.eyebrow} title={egypt.title} tagline={egypt.tagline} origin={egypt.originStory}
          extra={<div className="frieze" aria-hidden="true"><div className="frieze-track"><span>{FRIEZE.repeat(3)}</span><span>{FRIEZE.repeat(3)}</span></div></div>} />

        {egypt.cosmicCycle && <EgyptCycle cycle={egypt.cosmicCycle} onOpen={x.openById} />}

        <section className="block" aria-labelledby="egypt-gods-title">
          <Divider variant="egypt" />
          <SectionHead civ="egypt" emblem="egypt-pantheon" eyebrow={group.eyebrow} title={group.title} id="egypt-gods-title" />
          <SearchToolbar
            query={x.query} onQueryChange={x.setQuery} alignment={x.alignment} onAlignmentChange={x.setAlignment}
            alignments={["all"]} savedOnly={x.savedOnly} onSavedChange={x.setSavedOnly} savedCount={x.savedCount}
            onRandom={x.pickRandom} total={x.totalMatches} hasFilter={x.hasActiveFilter} placeholder="Search the Egyptian pantheon"
          />
          {empty ? (
            <p className="empty-state">No deities match. Try another name, role, or clear the filters.</p>
          ) : (
            <div className="stele-grid">
              {deities.map((d, i) => (
                <DeityCard key={d.id} deity={d} civ="egypt" index={i} layout="stack" isFavorite={x.isFavorite(d.id)} onToggleFavorite={x.toggleFavorite} onOpen={x.openDeity} />
              ))}
            </div>
          )}
        </section>
      </main>

      <DeityModal deity={x.activeDeity} civ="egypt" list={x.visible} onClose={x.closeDeity} onSelect={x.openDeity}
        isFavorite={x.activeDeity ? x.isFavorite(x.activeDeity.id) : false} onToggleFavorite={x.toggleFavorite} />
      <Footer showBackLink credit="EGYPT · THE ETERNAL NILE" />
    </>
  );
}
