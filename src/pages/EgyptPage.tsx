import { useEffect, useRef } from "react";
import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { DeityCard } from "../components/DeityCard";
import { DeityModal } from "../components/DeityModal";
import { SearchToolbar } from "../components/SearchToolbar";
import { Footer } from "../components/Footer";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { usePantheonExplorer } from "../hooks/usePantheonExplorer";
import { egypt } from "../data/registry";

const NODE_ICONS: Record<string, JSX.Element> = {
  Khepri: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20 Q16 8 28 20" stroke="#c8a96e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="20" r="5" stroke="#c8a96e" strokeWidth="1.2" fill="none" />
      <line x1="16" y1="9" x2="16" y2="6" stroke="#c8a96e" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <line x1="10" y1="11" x2="8" y2="9" stroke="#c8a96e" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="22" y1="11" x2="24" y2="9" stroke="#c8a96e" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="4" y1="22" x2="28" y2="22" stroke="#c8a96e" strokeWidth="0.8" opacity="0.3" />
    </svg>
  ),
  Ra: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="8" stroke="#c8a96e" strokeWidth="1.4" fill="rgba(200,169,110,0.12)" />
      <circle cx="16" cy="16" r="3" fill="#c8a96e" opacity="0.9" />
      <line x1="16" y1="4" x2="16" y2="7" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="25" x2="16" y2="28" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="4" y1="16" x2="7" y2="16" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="25" y1="16" x2="28" y2="16" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Atum: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 20 Q16 10 26 20" stroke="#c8a96e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="20" r="5" stroke="#c8a96e" strokeWidth="1.2" fill="rgba(200,169,110,0.08)" />
      <line x1="4" y1="22" x2="28" y2="22" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  Nun: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12 Q8 9 12 12 Q16 15 20 12 Q24 9 28 12" stroke="#c8a96e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M4 17 Q8 14 12 17 Q16 20 20 17 Q24 14 28 17" stroke="#c8a96e" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="16" cy="8" r="2" stroke="#c8a96e" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  ),
  Osiris: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 26 L11 14 Q11 8 16 8 Q21 8 21 13" stroke="#c8a96e" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M19 10 L24 6" stroke="#c8a96e" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M24 6 L22 14" stroke="#c8a96e" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="16" cy="28" r="2" stroke="#c8a96e" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  ),
  Horus: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="14" rx="4" ry="5" stroke="#c8a96e" strokeWidth="1.2" fill="none" />
      <circle cx="16" cy="13" r="1.5" fill="#c8a96e" opacity="0.8" />
      <path d="M12 14 Q6 18 4 24" stroke="#c8a96e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M20 14 Q26 18 28 24" stroke="#c8a96e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  ),
};

function MaatIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="7" stroke="#c8a96e" strokeWidth="1.2" fill="none" />
      <circle cx="16" cy="16" r="2" fill="#c8a96e" opacity="0.8" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="26" x2="16" y2="30" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="16" x2="6" y2="16" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="26" y1="16" x2="30" y2="16" stroke="#c8a96e" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CosmicCycleWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cycle = egypt.cosmicCycle;

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl || !cycle) return;

    const position = () => {
      const nodes = Array.from(container.querySelectorAll<HTMLElement>(".cycle-node"));
      const radius = container.offsetWidth / 2 - 70;
      const cx = container.offsetWidth / 2;
      const cy = container.offsetHeight / 2;

      nodes.forEach((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        node.style.left = `${cx + Math.cos(angle) * radius}px`;
        node.style.top = `${cy + Math.sin(angle) * radius}px`;
      });

      svgEl.setAttribute("viewBox", `0 0 ${container.offsetWidth} ${container.offsetHeight}`);
      svgEl.innerHTML = "";
      nodes.forEach((_, i) => {
        const a1 = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 1) / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + Math.cos(a1) * radius;
        const y1 = cy + Math.sin(a1) * radius;
        const x2 = cx + Math.cos(a2) * radius;
        const y2 = cy + Math.sin(a2) * radius;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2}`);
        path.setAttribute("stroke", "rgba(200,169,110,0.25)");
        path.setAttribute("stroke-width", "1");
        path.setAttribute("fill", "none");
        svgEl.appendChild(path);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(cx));
        line.setAttribute("y1", String(cy));
        line.setAttribute("x2", String(x1));
        line.setAttribute("y2", String(y1));
        line.setAttribute("stroke", "rgba(200,169,110,0.1)");
        line.setAttribute("stroke-width", "0.5");
        svgEl.appendChild(line);
      });
    };

    position();
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [cycle]);

  if (!cycle) return null;

  return (
    <>
      <div className="section-head-center reveal">
        <p className="section-eyebrow">{cycle.eyebrow}</p>
        <h2 className="section-h2-egypt">{cycle.title}</h2>
        <p className="section-desc-sm">{cycle.description}</p>
      </div>

      <div className="cycle-container reveal" ref={containerRef}>
        <div className="cycle-ring"></div>
        <div className="cycle-ring cycle-ring-2"></div>
        <svg className="cycle-svg" ref={svgRef}></svg>

        <div className="cycle-center">
          <div className="cycle-center-content">
            <div className="cycle-symbol">
              <MaatIcon />
            </div>
            <div className="cycle-name">MA'AT</div>
            <div className="cycle-order-label">Divine Order</div>
          </div>
        </div>

        {cycle.nodes.map((node, i) => (
          <div className="cycle-node" data-index={i} key={node.name}>
            <div className="cycle-node-icon">{NODE_ICONS[node.name]}</div>
            <div className="node-name">{node.name}</div>
            <div className="node-aspect">{node.aspect}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function EgyptPage() {
  const explorer = usePantheonExplorer(egypt);
  useScrollReveal([explorer.query, explorer.alignment]);
  const pantheonGroup = egypt.groups[0];
  const deities = explorer.hasActiveFilter
    ? explorer.results.find((r) => r.group.id === pantheonGroup.id)?.deities ?? []
    : pantheonGroup.deities;

  return (
    <>
      <BackgroundCanvas theme="egypt" />
      <main className="page-wrapper">
        <header className="egypt-header">
          <p className="eyebrow page-eyebrow reveal">{egypt.eyebrow}</p>
          <h1 className="page-h1 reveal">{egypt.title}</h1>
          <p className="page-subtitle reveal">{egypt.tagline}</p>
          <div className="hero-before-text reveal" style={{ textAlign: "center" }}>
            <p className="before-label">Before the First God</p>
            <p className="before-body">{egypt.originStory}</p>
          </div>
        </header>

        <section className="egypt-cosmos">
          <CosmicCycleWheel />
        </section>

        <section className="egypt-gods-section">
          <div className="egypt-gods-head reveal">
            <p className="section-eyebrow">{pantheonGroup.eyebrow}</p>
            <h2 className="section-h2-egypt">{pantheonGroup.title}</h2>
          </div>

          <SearchToolbar
            query={explorer.query}
            onQueryChange={explorer.setQuery}
            alignment={explorer.alignment}
            onAlignmentChange={explorer.setAlignment}
            alignments={["all"]}
            onRandom={explorer.pickRandom}
            placeholder="Search the Egyptian pantheon"
          />

          {explorer.hasActiveFilter && (
            <p className="result-count">{explorer.totalMatches} deities found</p>
          )}

          {explorer.hasActiveFilter && explorer.totalMatches === 0 ? (
            <p className="empty-state">No deities match your search. Try a different term.</p>
          ) : (
            <div className="egypt-gods-grid">
              {deities.map((deity) => (
                <DeityCard
                  key={deity.id}
                  deity={deity}
                  variant="egypt"
                  isFavorite={explorer.isFavorite(deity.id)}
                  onToggleFavorite={explorer.toggleFavorite}
                  onOpen={explorer.openDeity}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <DeityModal
        deity={explorer.activeDeity}
        onClose={explorer.closeDeity}
        isFavorite={explorer.activeDeity ? explorer.isFavorite(explorer.activeDeity.id) : false}
        onToggleFavorite={explorer.toggleFavorite}
      />

      <Footer showBackLink credit="EGYPT · THE ETERNAL NILE" />
    </>
  );
}
