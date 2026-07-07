/**
 * Shared type contracts for the ANAHITA mythology archive.
 * These types describe the raw, serializable shape of the content.
 * Runtime behaviour is layered on top by the classes in `src/models`.
 */

export type Alignment = "good" | "evil" | "neutral";

export interface DeityRecord {
  id: string;
  name: string;
  nativeText: string;
  role: string;
  alignment: Alignment;
  description: string;
  image: string | null;
}

export interface DeityGroup {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  deities: DeityRecord[];
}

export interface CosmicCycleNode {
  name: string;
  aspect: string;
}

export interface CosmicCycle {
  eyebrow: string;
  title: string;
  description: string;
  nodes: CosmicCycleNode[];
}

export interface PantheonData {
  id: string;
  name: string;
  title: string;
  eyebrow: string;
  tagline: string;
  originStory: string;
  cosmicCycle?: CosmicCycle;
  groups: DeityGroup[];
}
