import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Deity } from "../models/Deity";
import { Icon, DividerLite, type Civ } from "../art/core";
import { Plate } from "./Plate";
import { NativeText } from "./DeityCard";

interface DeityModalProps {
  deity: Deity | null;
  civ: Civ;
  list: Deity[];
  onClose: () => void;
  onSelect: (d: Deity) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function DeityModal({ deity, civ, list, onClose, onSelect, isFavorite, onToggleFavorite }: DeityModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idx = deity ? list.findIndex((d) => d.id === deity.id) : -1;
  const prev = idx > 0 ? list[idx - 1] : list.length > 1 ? list[list.length - 1] : null;
  const next = idx >= 0 && list.length > 1 ? list[(idx + 1) % list.length] : null;

  // lock scroll, trap focus, restore focus on close
  useEffect(() => {
    if (!deity) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add("scroll-locked");
    dialogRef.current?.querySelector<HTMLElement>(".modal-close")?.focus();
    return () => {
      document.body.classList.remove("scroll-locked");
      opener?.focus?.();
    };
  }, [!!deity]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!deity) return;
    bodyRef.current?.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight" && next) onSelect(next);
      if (e.key === "ArrowLeft" && prev) onSelect(prev);
      if (e.key === "Tab" && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]),a[href]"));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [deity, next, prev, onClose, onSelect]);

  if (!deity) return null;

  // Portal to <body> so `position: fixed` is always viewport-relative, regardless of ancestor transforms.
  return createPortal(
    <div className="modal-backdrop" data-civ={civ} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={deity.name} ref={dialogRef}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        <div className="modal-media">
          <Plate civ={civ} image={deity.image} alt={deity.name} sizes="(min-width:860px) 340px, 70vw" eager />
        </div>
        <div className="modal-body" ref={bodyRef}>
          <p className="eyebrow">{list.length > 1 && idx >= 0 ? `${idx + 1} of ${list.length}` : "Divine being"}</p>
          <h2 className="modal-name">{deity.name}</h2>
          <NativeText civ={civ} text={deity.nativeText} />
          <span className={`pill${deity.alignment === "evil" ? " pill-evil" : ""}`}>{deity.role}</span>
          <DividerLite />
          <p className="modal-text">{deity.description}</p>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => onToggleFavorite(deity.id)} aria-pressed={isFavorite}>
              <Icon name="heart" size={15} filled={isFavorite} /> {isFavorite ? "Saved" : "Save"}
            </button>
            {list.length > 1 && (
              <div className="modal-nav">
                <button className="btn btn-icon" onClick={() => prev && onSelect(prev)} aria-label={`Previous: ${prev?.name}`}><Icon name="arrow-left" size={16} /></button>
                <button className="btn btn-icon" onClick={() => next && onSelect(next)} aria-label={`Next: ${next?.name}`}><Icon name="arrow-right" size={16} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
