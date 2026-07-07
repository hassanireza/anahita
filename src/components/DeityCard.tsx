import type { MouseEvent } from "react";
import type { Deity } from "../models/Deity";

interface DeityCardProps {
  deity: Deity;
  variant: "persian" | "egypt" | "greek";
  reversed?: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (deity: Deity) => void;
}

function FavoriteButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: (event: MouseEvent) => void;
}) {
  return (
    <button
      className={`favorite-toggle${active ? " active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      title={active ? "Remove from favorites" : "Add to favorites"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21s-6.7-4.35-9.3-8.2C.86 9.9 1.6 6.3 4.6 4.9c2.3-1.07 4.9-.2 6.4 1.85C12.5 4.7 15.1 3.83 17.4 4.9c3 1.4 3.74 5 1.9 7.9C18.7 16.65 12 21 12 21z" />
      </svg>
    </button>
  );
}

/**
 * Renders one deity using the visual language of its civilization.
 * The three legacy card layouts (persian-god-card, egypt-god-card,
 * greek-god-card) are preserved exactly so the ported CSS applies
 * without modification.
 */
export function DeityCard({ deity, variant, reversed, isFavorite, onToggleFavorite, onOpen }: DeityCardProps) {
  const handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    onToggleFavorite(deity.id);
  };

  const image = deity.image ? (
    <img
      className={
        variant === "persian" ? "persian-god-img" : variant === "egypt" ? "egypt-god-img" : "greek-god-img"
      }
      src={deity.image}
      alt={deity.name}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.cssText =
          "width:100%;height:100%;min-height:180px;background:linear-gradient(135deg,#241a08,#120c02);display:block;";
      }}
    />
  ) : null;

  if (variant === "persian") {
    return (
      <article
        className="persian-god-card clickable-card reveal"
        style={{ position: "relative" }}
        onClick={() => onOpen(deity)}
      >
        <FavoriteButton active={isFavorite} onClick={handleFavoriteClick} />
        {!reversed && image}
        <div className="persian-god-info">
          <h3>{deity.name}</h3>
          <p className="farsi">{deity.nativeText}</p>
          <span className={`role${deity.alignment === "evil" ? " role-evil" : ""}`}>{deity.role}</span>
          <p>{deity.description}</p>
        </div>
        {reversed && image}
      </article>
    );
  }

  if (variant === "egypt") {
    return (
      <article className="egypt-god-card reveal clickable-card" style={{ position: "relative" }} onClick={() => onOpen(deity)}>
        <FavoriteButton active={isFavorite} onClick={handleFavoriteClick} />
        <div className="egypt-img-wrap">{image}</div>
        <div className="egypt-card-body">
          <h3>{deity.name}</h3>
          <div className="hieroglyph">{deity.nativeText}</div>
          <span className="aspect">{deity.role}</span>
          <p>{deity.description}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="greek-god-card clickable-card reveal" style={{ position: "relative" }} onClick={() => onOpen(deity)}>
      <FavoriteButton active={isFavorite} onClick={handleFavoriteClick} />
      <div className="greek-img-wrap">{image}</div>
      <div className="greek-card-body">
        <h3>{deity.name}</h3>
        <p className="greek-name">{deity.nativeText}</p>
        <span className="domain">{deity.role}</span>
        <p>{deity.description}</p>
      </div>
    </article>
  );
}
