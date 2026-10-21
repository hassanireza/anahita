import { useEffect, useRef } from "react";
import type { Alignment } from "../types/mythology";
import { Icon } from "../art/core";

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  alignment: Alignment | "all";
  onAlignmentChange: (v: Alignment | "all") => void;
  alignments: Array<Alignment | "all">;
  savedOnly: boolean;
  onSavedChange: (v: boolean) => void;
  savedCount: number;
  onRandom: () => void;
  total: number;
  hasFilter: boolean;
  placeholder?: string;
}

const LABELS: Record<Alignment | "all", string> = { all: "All", good: "Light", evil: "Darkness", neutral: "Neutral" };

export function SearchToolbar(p: Props) {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "/" && !/INPUT|TEXTAREA/.test(t.tagName)) { e.preventDefault(); input.current?.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);

  return (
    <div className="toolbar" role="search">
      <div className="toolbar-search">
        <Icon name="search" size={16} />
        <input
          ref={input}
          type="search"
          value={p.query}
          onChange={(e) => p.onQueryChange(e.target.value)}
          placeholder={p.placeholder ?? "Search by name, role, or domain"}
          aria-label="Search deities"
          enterKeyHint="search"
        />
        {p.query ? (
          <button className="toolbar-clear" onClick={() => { p.onQueryChange(""); input.current?.focus(); }} aria-label="Clear search"><Icon name="close" size={14} /></button>
        ) : (
          <kbd aria-hidden="true">/</kbd>
        )}
      </div>
      <div className="toolbar-chips">
        {p.alignments.length > 1 && p.alignments.map((a) => (
          <button key={a} className={`chip${p.alignment === a ? " active" : ""}`} aria-pressed={p.alignment === a} onClick={() => p.onAlignmentChange(a)}>{LABELS[a]}</button>
        ))}
        <button className={`chip chip-saved${p.savedOnly ? " active" : ""}`} aria-pressed={p.savedOnly} onClick={() => p.onSavedChange(!p.savedOnly)}>
          <Icon name="heart" size={13} filled={p.savedOnly} /> Saved{p.savedCount > 0 ? ` · ${p.savedCount}` : ""}
        </button>
        <button className="chip chip-random" onClick={p.onRandom}><Icon name="dice" size={14} /> Random</button>
      </div>
      <p className="toolbar-status" role="status" aria-live="polite">
        {p.hasFilter ? `${p.total} ${p.total === 1 ? "deity" : "deities"} found` : ""}
      </p>
    </div>
  );
}
