import type { Alignment } from "../types/mythology";

interface SearchToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  alignment: Alignment | "all";
  onAlignmentChange: (value: Alignment | "all") => void;
  alignments: Array<Alignment | "all">;
  onRandom: () => void;
  placeholder?: string;
}

const LABELS: Record<Alignment | "all", string> = {
  all: "All",
  good: "Benevolent",
  evil: "Malevolent",
  neutral: "Neutral",
};

export function SearchToolbar({
  query,
  onQueryChange,
  alignment,
  onAlignmentChange,
  alignments,
  onRandom,
  placeholder = "Search by name, role, or domain",
}: SearchToolbarProps) {
  return (
    <div className="toolbar reveal">
      <div className="toolbar-search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
          <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          aria-label="Search deities"
        />
      </div>
      {alignments.length > 1 && (
        <div className="toolbar-filters">
          {alignments.map((a) => (
            <button
              key={a}
              className={`filter-chip${alignment === a ? " active" : ""}`}
              onClick={() => onAlignmentChange(a)}
            >
              {LABELS[a]}
            </button>
          ))}
        </div>
      )}
      <button className="toolbar-random" onClick={onRandom}>
        Random Deity
      </button>
    </div>
  );
}
