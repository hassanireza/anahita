import { useEffect } from "react";
import type { Deity } from "../models/Deity";
import { assetUrl } from "../utils/assetUrl";

interface DeityModalProps {
  deity: Deity | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function DeityModal({ deity, onClose, isFavorite, onToggleFavorite }: DeityModalProps) {
  useEffect(() => {
    if (!deity) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [deity, onClose]);

  if (!deity) return null;

  return (
    <div
      className="deity-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={deity.name}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="deity-modal">
        <button className="deity-modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        {deity.image ? (
          <img
            className="deity-modal-image"
            src={assetUrl(deity.image)}
            alt={deity.name}
            onError={(event) => {
              event.currentTarget.style.cssText =
                "background:linear-gradient(135deg,#241a08,#120c02);display:block;min-height:220px;";
            }}
          />
        ) : (
          <div className="deity-modal-image" style={{ background: "linear-gradient(135deg,#241a08,#120c02)" }} />
        )}
        <div className="deity-modal-body">
          <h2 className="deity-modal-name">{deity.name}</h2>
          {deity.nativeText && <p className="deity-modal-native">{deity.nativeText}</p>}
          <span className={`deity-modal-role${deity.alignment === "evil" ? " evil" : ""}`}>{deity.role}</span>
          <p>{deity.description}</p>
          <button
            className="toolbar-random"
            style={{ marginTop: "1.3rem" }}
            onClick={() => onToggleFavorite(deity.id)}
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
