import { useCallback, useMemo, useState } from "react";
import type { Pantheon } from "../models/Pantheon";
import type { Deity } from "../models/Deity";
import type { Alignment } from "../types/mythology";
import { useFavorites } from "./useFavorites";

export function usePantheonExplorer(pantheon: Pantheon) {
  const [query, setQuery] = useState("");
  const [alignment, setAlignment] = useState<Alignment | "all">("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [activeDeity, setActiveDeity] = useState<Deity | null>(null);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const results = useMemo(
    () =>
      pantheon
        .search(query, alignment)
        .map((r) => ({ ...r, deities: savedOnly ? r.deities.filter((d) => favorites.has(d.id)) : r.deities }))
        .filter((r) => r.deities.length > 0),
    [pantheon, query, alignment, savedOnly, favorites]
  );

  const byGroup = useMemo(() => new Map(results.map((r) => [r.group.id, r.deities])), [results]);
  const visible = useMemo(() => results.flatMap((r) => r.deities), [results]);
  const hasActiveFilter = query.trim().length > 0 || alignment !== "all" || savedOnly;
  const savedCount = useMemo(() => pantheon.allDeities.filter((d) => favorites.has(d.id)).length, [pantheon, favorites]);

  const closeDeity = useCallback(() => setActiveDeity(null), []);
  const openDeity = useCallback((d: Deity) => setActiveDeity(d), []);
  const openById = useCallback((id: string) => {
    const d = pantheon.findById(id);
    if (d) setActiveDeity(d);
  }, [pantheon]);
  const pickRandom = useCallback(() => {
    const d = pantheon.randomDeity();
    if (d) setActiveDeity(d);
  }, [pantheon]);

  return {
    query, setQuery, alignment, setAlignment, savedOnly, setSavedOnly, savedCount,
    results, byGroup, visible, hasActiveFilter, totalMatches: visible.length,
    activeDeity, openDeity, openById, closeDeity, pickRandom, isFavorite, toggleFavorite,
  };
}
