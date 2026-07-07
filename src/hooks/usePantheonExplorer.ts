import { useMemo, useState } from "react";
import type { Pantheon } from "../models/Pantheon";
import type { Deity } from "../models/Deity";
import type { Alignment } from "../types/mythology";
import { useFavorites } from "./useFavorites";

export function usePantheonExplorer(pantheon: Pantheon) {
  const [query, setQuery] = useState("");
  const [alignment, setAlignment] = useState<Alignment | "all">("all");
  const [activeDeity, setActiveDeity] = useState<Deity | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const results = useMemo(
    () => pantheon.search(query, alignment),
    [pantheon, query, alignment]
  );

  const hasActiveFilter = query.trim().length > 0 || alignment !== "all";
  const totalMatches = results.reduce((sum, r) => sum + r.deities.length, 0);

  const openDeity = (deity: Deity) => setActiveDeity(deity);
  const closeDeity = () => setActiveDeity(null);

  const pickRandom = () => {
    const deity = pantheon.randomDeity();
    if (deity) setActiveDeity(deity);
  };

  return {
    query,
    setQuery,
    alignment,
    setAlignment,
    results,
    hasActiveFilter,
    totalMatches,
    activeDeity,
    openDeity,
    closeDeity,
    pickRandom,
    isFavorite,
    toggleFavorite,
  };
}
