import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "anahita.favorites";

function readStoredFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed as string[]);
    return new Set();
  } catch {
    return new Set();
  }
}

/**
 * Persists a set of favorited deity ids to localStorage. This is one
 * of the new features added during the migration: visitors can mark
 * gods they want to remember and revisit them later from any page.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => readStoredFavorites());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch {
      /* localStorage may be unavailable (private browsing); fail silently */
    }
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
