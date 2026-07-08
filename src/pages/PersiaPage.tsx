import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { DeityCard } from "../components/DeityCard";
import { DeityModal } from "../components/DeityModal";
import { SearchToolbar } from "../components/SearchToolbar";
import { Footer } from "../components/Footer";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { usePantheonExplorer } from "../hooks/usePantheonExplorer";
import { persia } from "../data/registry";
import { assetUrl } from "../utils/assetUrl";

export function PersiaPage() {
  const explorer = usePantheonExplorer(persia);
  useScrollReveal([explorer.query, explorer.alignment]);

  const primalGroup = persia.groups[0];
  const yazataGroup = persia.groups[1];

  const filteredPrimal = explorer.hasActiveFilter
    ? explorer.results.find((r) => r.group.id === primalGroup.id)?.deities ?? []
    : primalGroup.deities;
  const filteredYazatas = explorer.hasActiveFilter
    ? explorer.results.find((r) => r.group.id === yazataGroup.id)?.deities ?? []
    : yazataGroup.deities;

  const goodPrimal = filteredPrimal.filter((d) => d.alignment === "good");
  const evilPrimal = filteredPrimal.filter((d) => d.alignment === "evil");

  return (
    <>
      <BackgroundCanvas theme="persia" />
      <main className="page-wrapper">
        <header className="persia-header">
          <p className="eyebrow page-eyebrow reveal">{persia.eyebrow}</p>
          <h1 className="reveal glow">{persia.title}</h1>
          <p className="tagline persia-tagline reveal">{persia.tagline}</p>
          <div className="hero-before-text reveal" style={{ textAlign: "center" }}>
            <p className="before-label">Before the First God</p>
            <p className="before-body">{persia.originStory}</p>
          </div>
        </header>

        <section className="persia-cosmos">
          <div className="persia-section-head reveal">
            <p className="section-eyebrow">{primalGroup.eyebrow}</p>
            <h2 className="section-h2-persia">{primalGroup.title}</h2>
            <p className="section-desc">{primalGroup.description}</p>
          </div>

          <SearchToolbar
            query={explorer.query}
            onQueryChange={explorer.setQuery}
            alignment={explorer.alignment}
            onAlignmentChange={explorer.setAlignment}
            alignments={["all", "good", "evil"]}
            onRandom={explorer.pickRandom}
            placeholder="Search the Persian pantheon"
          />

          {explorer.hasActiveFilter && (
            <p className="result-count">{explorer.totalMatches} deities found</p>
          )}

          {explorer.hasActiveFilter && explorer.totalMatches === 0 ? (
            <p className="empty-state">No deities match your search. Try a different term.</p>
          ) : (
            <div className="duality-split reveal duality-split-reveal">
              <div className="good-side">
                <div className="side-intro">
                  <span className="duality-label good-label">The Light. اهورامزدا</span>
                  <h3 className="side-title">AHURA MAZDA</h3>
                  <p className="side-intro-subtitle">Lord of Wisdom, the Uncreated, Eternal Good</p>
                </div>
                {goodPrimal.map((deity) => (
                  <DeityCard
                    key={deity.id}
                    deity={deity}
                    variant="persian"
                    isFavorite={explorer.isFavorite(deity.id)}
                    onToggleFavorite={explorer.toggleFavorite}
                    onOpen={explorer.openDeity}
                  />
                ))}
              </div>

              <div className="duality-axis">
                <div className="duality-symbol">
                  <svg viewBox="0 0 28 28" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Crossed swords">
                    <line x1="4" y1="4" x2="24" y2="24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="24" y1="4" x2="4" y2="24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <polygon points="4,4 7,5 5,7" fill="currentColor" opacity="0.9" />
                    <polygon points="24,4 21,5 23,7" fill="currentColor" opacity="0.9" />
                    <polygon points="4,24 7,23 5,21" fill="currentColor" opacity="0.9" />
                    <polygon points="24,24 21,23 23,21" fill="currentColor" opacity="0.9" />
                    <circle cx="14" cy="14" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <div className="duality-axis-line"></div>
                <div className="duality-symbol duality-symbol-evil">
                  <svg viewBox="0 0 28 28" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Flame of destruction">
                    <path
                      d="M14 25 C14 25 6 19 6 13 C6 9 9 6 12 7 C11 5 12 3 14 3 C16 3 17 5 16 7 C19 6 22 9 22 13 C22 19 14 25 14 25Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                      fill="none"
                      opacity="0.85"
                    />
                    <path
                      d="M14 22 C14 22 10 18 10 14.5 C10 12.5 12 11 13 12 C13 10.5 14 9 15 10 C16 11 17 12.5 17 14.5 C17 18 14 22 14 22Z"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </div>

              <div className="evil-side">
                <div className="side-intro">
                  <span className="duality-label evil-label">The Darkness. اهریمن</span>
                  <h3 className="side-title">ANGRA MAINYU</h3>
                  <p className="side-intro-subtitle">The Destructive Spirit, the Uncreated, Eternal Evil</p>
                </div>
                {evilPrimal.map((deity) => (
                  <DeityCard
                    key={deity.id}
                    deity={deity}
                    variant="persian"
                    reversed
                    isFavorite={explorer.isFavorite(deity.id)}
                    onToggleFavorite={explorer.toggleFavorite}
                    onOpen={explorer.openDeity}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="section-divider"></div>

        <section className="yazata-section">
          <div className="persia-section-head reveal">
            <p className="section-eyebrow">{yazataGroup.eyebrow}</p>
            <h2>{yazataGroup.title}</h2>
            <p className="section-desc">{yazataGroup.description}</p>
          </div>

          <div className="yazata-grid yazata-grid-reveal">
            {filteredYazatas.map((deity) => (
              <div key={deity.id} className="yazata-card reveal clickable-card" style={{ position: "relative" }} onClick={() => explorer.openDeity(deity)}>
                <div className="yazata-img-wrap">
                  {deity.image && (
                    <img
                      className="yazata-img"
                      src={assetUrl(deity.image)}
                      alt={deity.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.cssText =
                          "width:100%;height:100%;background:linear-gradient(135deg,#1a1400,#0f0b00);display:block;";
                      }}
                    />
                  )}
                </div>
                <div className="yazata-body">
                  <h3>{deity.name}</h3>
                  <p className="farsi">{deity.nativeText}</p>
                  <span className="role">{deity.role}</span>
                  <p>{deity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <DeityModal
        deity={explorer.activeDeity}
        onClose={explorer.closeDeity}
        isFavorite={explorer.activeDeity ? explorer.isFavorite(explorer.activeDeity.id) : false}
        onToggleFavorite={explorer.toggleFavorite}
      />

      <Footer showBackLink credit="PERSIA · THE SACRED FLAME" />
    </>
  );
}
