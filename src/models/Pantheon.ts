import type {
  Alignment,
  CosmicCycle,
  DeityGroup as DeityGroupRecord,
  PantheonData,
} from "../types/mythology";
import { Deity } from "./Deity";

/**
 * DeityGroupModel wraps one thematic cluster of deities
 * (for example "The Titans" or "The Yazatas") and provides
 * filtering helpers scoped to that cluster.
 */
export class DeityGroupModel {
  public readonly id: string;
  public readonly title: string;
  public readonly eyebrow: string;
  public readonly description: string;
  public readonly deities: Deity[];

  constructor(record: DeityGroupRecord) {
    this.id = record.id;
    this.title = record.title;
    this.eyebrow = record.eyebrow;
    this.description = record.description;
    this.deities = record.deities.map((d) => new Deity(d));
  }

  public search(query: string, alignment: Alignment | "all" = "all"): Deity[] {
    return this.deities.filter(
      (deity) => deity.matches(query) && deity.isAligned(alignment)
    );
  }

  public get count(): number {
    return this.deities.length;
  }
}

/**
 * Pantheon is the top level aggregate for a civilization (Persia,
 * Egypt, or Greece). It owns the groups of deities belonging to that
 * civilization and exposes convenience methods for search, random
 * selection, and lookup by id, so pages stay declarative.
 */
export class Pantheon {
  public readonly id: string;
  public readonly name: string;
  public readonly title: string;
  public readonly eyebrow: string;
  public readonly tagline: string;
  public readonly originStory: string;
  public readonly cosmicCycle?: CosmicCycle;
  public readonly groups: DeityGroupModel[];

  constructor(data: PantheonData) {
    this.id = data.id;
    this.name = data.name;
    this.title = data.title;
    this.eyebrow = data.eyebrow;
    this.tagline = data.tagline;
    this.originStory = data.originStory;
    this.cosmicCycle = data.cosmicCycle;
    this.groups = data.groups.map((g) => new DeityGroupModel(g));
  }

  /** Flattened list of every deity in this pantheon. */
  public get allDeities(): Deity[] {
    return this.groups.flatMap((g) => g.deities);
  }

  public get totalDeities(): number {
    return this.allDeities.length;
  }

  public findById(id: string): Deity | undefined {
    return this.allDeities.find((d) => d.id === id);
  }

  public search(query: string, alignment: Alignment | "all" = "all") {
    return this.groups
      .map((group) => ({
        group,
        deities: group.search(query, alignment),
      }))
      .filter((entry) => entry.deities.length > 0);
  }

  public randomDeity(): Deity | undefined {
    const all = this.allDeities;
    if (all.length === 0) return undefined;
    const index = Math.floor(Math.random() * all.length);
    return all[index];
  }
}

/**
 * PantheonRegistry is a small singleton-style registry that keeps
 * every loaded civilization in one place, so navigation, search, and
 * the "random god" feature can operate across the whole archive
 * without each page re-importing every dataset individually.
 */
export class PantheonRegistry {
  private readonly pantheons: Map<string, Pantheon> = new Map();

  constructor(pantheons: Pantheon[]) {
    for (const pantheon of pantheons) {
      this.pantheons.set(pantheon.id, pantheon);
    }
  }

  public get(id: string): Pantheon | undefined {
    return this.pantheons.get(id);
  }

  public get all(): Pantheon[] {
    return Array.from(this.pantheons.values());
  }

  public get totalDeities(): number {
    return this.all.reduce((sum, p) => sum + p.totalDeities, 0);
  }

  public randomDeity(): { pantheon: Pantheon; deity: Deity } | undefined {
    const pantheons = this.all.filter((p) => p.totalDeities > 0);
    if (pantheons.length === 0) return undefined;
    const pantheon = pantheons[Math.floor(Math.random() * pantheons.length)];
    const deity = pantheon.randomDeity();
    if (!deity) return undefined;
    return { pantheon, deity };
  }

  public searchAll(query: string) {
    return this.all.map((pantheon) => ({
      pantheon,
      results: pantheon.search(query),
    }));
  }
}
