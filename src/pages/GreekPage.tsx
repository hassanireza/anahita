import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { DeityCard } from "../components/DeityCard";
import { DeityModal } from "../components/DeityModal";
import { SearchToolbar } from "../components/SearchToolbar";
import { Footer } from "../components/Footer";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { usePantheonExplorer } from "../hooks/usePantheonExplorer";
import { greek } from "../data/registry";

export function GreekPage() {
  const explorer = usePantheonExplorer(greek);
  useScrollReveal([explorer.query, explorer.alignment]);

  const resultMap = new Map(explorer.results.map((r) => [r.group.id, r.deities]));

  return (
    <>
      <BackgroundCanvas theme="greek" />
      <main className="page-wrapper">
        <header className="greek-header">
          <p className="eyebrow page-eyebrow reveal">{greek.eyebrow}</p>
          <h1 className="page-h1 reveal">{greek.title}</h1>
          <p className="page-subtitle reveal">{greek.tagline}</p>
          <div className="hero-before-text reveal" style={{ textAlign: "center" }}>
            <p className="before-label">Before the First God</p>
            <p className="before-body">{greek.originStory}</p>
          </div>
        </header>

        <SearchToolbar
          query={explorer.query}
          onQueryChange={explorer.setQuery}
          alignment={explorer.alignment}
          onAlignmentChange={explorer.setAlignment}
          alignments={["all"]}
          onRandom={explorer.pickRandom}
          placeholder="Search the Greek pantheon"
        />

        {explorer.hasActiveFilter && (
          <p className="result-count">{explorer.totalMatches} deities found</p>
        )}

        {explorer.hasActiveFilter && explorer.totalMatches === 0 && (
          <p className="empty-state">No deities match your search. Try a different term.</p>
        )}

        <section className="greek-cosmos">
          {greek.groups.map((group, index) => {
            const deities = explorer.hasActiveFilter ? resultMap.get(group.id) ?? [] : group.deities;
            if (explorer.hasActiveFilter && deities.length === 0) return null;
            return (
              <div key={group.id}>
                <div className="family-generation reveal">
                  <div className="tree-section-label">{group.eyebrow}</div>
                  <div className="gen-title">{group.title}</div>
                  <div className={`gen-grid${deities.length <= 3 ? " gen-grid-wide" : ""}`}>
                    {deities.map((deity) => (
                      <DeityCard
                        key={deity.id}
                        deity={deity}
                        variant="greek"
                        isFavorite={explorer.isFavorite(deity.id)}
                        onToggleFavorite={explorer.toggleFavorite}
                        onOpen={explorer.openDeity}
                      />
                    ))}
                  </div>
                </div>
                {index < greek.groups.length - 1 && (
                  <div className="lineage-connector reveal">
                    <span className="lineage-label">DESCENDED FROM</span>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>

      <DeityModal
        deity={explorer.activeDeity}
        onClose={explorer.closeDeity}
        isFavorite={explorer.activeDeity ? explorer.isFavorite(explorer.activeDeity.id) : false}
        onToggleFavorite={explorer.toggleFavorite}
      />

      <Footer showBackLink credit="GREECE · MOUNT OLYMPUS" />
    </>
  );
}
