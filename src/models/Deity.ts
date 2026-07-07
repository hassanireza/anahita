import type { Alignment, DeityRecord } from "../types/mythology";

/**
 * Deity encapsulates a single divine being and exposes small, pure
 * helper methods used by the presentation layer. Keeping this logic
 * inside a class (rather than scattering it across components) is
 * what makes the "OOP" shape of the app real rather than cosmetic.
 */
export class Deity {
  public readonly id: string;
  public readonly name: string;
  public readonly nativeText: string;
  public readonly role: string;
  public readonly alignment: Alignment;
  public readonly description: string;
  public readonly image: string | null;

  constructor(record: DeityRecord) {
    this.id = record.id;
    this.name = record.name;
    this.nativeText = record.nativeText;
    this.role = record.role;
    this.alignment = record.alignment;
    this.description = record.description;
    this.image = record.image;
  }

  /** Short excerpt used in cards, list previews, and search results. */
  public excerpt(maxLength = 140): string {
    if (this.description.length <= maxLength) return this.description;
    const cut = this.description.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");
    return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}...`;
  }

  /** Case-insensitive check used by the search and filter features. */
  public matches(query: string): boolean {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      this.name.toLowerCase().includes(q) ||
      this.role.toLowerCase().includes(q) ||
      this.description.toLowerCase().includes(q) ||
      this.nativeText.toLowerCase().includes(q)
    );
  }

  public isAligned(alignment: Alignment | "all"): boolean {
    return alignment === "all" || this.alignment === alignment;
  }

  public toRecord(): DeityRecord {
    return {
      id: this.id,
      name: this.name,
      nativeText: this.nativeText,
      role: this.role,
      alignment: this.alignment,
      description: this.description,
      image: this.image,
    };
  }
}
