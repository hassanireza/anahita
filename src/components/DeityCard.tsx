import type { MouseEvent } from "react";
import type { Deity } from "../models/Deity";
import { Icon, type Civ } from "../art/core";
import { Plate } from "./Plate";

export type CardLayout = "side" | "stack" | "feature";

interface DeityCardProps {
  deity: Deity;
  civ: Civ;
  layout?: CardLayout;
  reversed?: boolean;
  index?: number;
  sizes?: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (deity: Deity) => void;
}

export function FavoriteButton({ active, onClick }: { active: boolean; onClick: (e: MouseEvent) => void }) {
  return (
    <button
      type="button"
      className={`favorite-toggle${active ? " active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Remove from saved" : "Save to favorites"}
      title={active ? "Remove from saved" : "Save to favorites"}
    >
      <Icon name="heart" size={16} filled={active} />
    </button>
  );
}

/** Native-language line, rendered with the right script, direction and font. */
export function NativeText({ civ, text }: { civ: Civ; text: string }) {
  if (!text) return null;
  if (civ === "persia") return <p className="native native-fa" lang="fa" dir="rtl">{text}</p>;
  if (civ === "egypt") return <p className="native native-hiero" aria-hidden="true">{text}</p>;
  return <p className="native native-gr" lang="el">{text}</p>;
}

export function DeityCard({ deity, civ, layout = "stack", reversed, index = 0, sizes, isFavorite, onToggleFavorite, onOpen }: DeityCardProps) {
  const fav = (e: MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(deity.id);
  };
  const defaultSizes =
    layout === "side" ? "(min-width:1000px) 220px, (min-width:560px) 220px, 90vw"
    : layout === "feature" ? "(min-width:1000px) 560px, 80vw"
    : "(min-width:1040px) 360px, (min-width:720px) 300px, 50vw";

  return (
    <article
      className={`card card-${civ} card-${layout}${reversed ? " is-reversed" : ""} ${deity.alignment === "evil" ? "is-evil" : ""} reveal`}
      data-civ={civ}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="card-media tilt">
        <Plate civ={civ} image={deity.image} alt={`${deity.name}, ${deity.role}`} sizes={sizes ?? defaultSizes} />
        <FavoriteButton active={isFavorite} onClick={fav} />
      </div>
      <div className="card-body">
        <h3 className="card-name">
          <button type="button" className="card-open" onClick={() => onOpen(deity)} aria-haspopup="dialog">
            {deity.name}
          </button>
        </h3>
        <NativeText civ={civ} text={deity.nativeText} />
        <span className={`pill${deity.alignment === "evil" ? " pill-evil" : ""}`}>{deity.role}</span>
        <p className="card-text">{deity.description}</p>
        <span className="card-more" aria-hidden="true">
          Read the legend <Icon name="arrow-right" size={14} />
        </span>
      </div>
    </article>
  );
}
