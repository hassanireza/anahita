import { useCallback, type CSSProperties, type ReactNode } from "react";
import { imageProps } from "../utils/assetUrl";
import { PlateCorners, type Civ } from "../art/core";

interface PlateProps {
  civ: Civ;
  image: string | null;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Art-directed image frame. Each civilization has its own silhouette
 * (Persian arch, Egyptian stele, Greek pediment) drawn in CSS, with SVG
 * corner ornaments, a dominant-colour placeholder and a fade-in on load.
 */
export function Plate({ civ, image, alt, sizes, eager, className = "", children }: PlateProps) {
  const img = image ? imageProps(image) : null;
  const ref = useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth > 0) el.classList.add("loaded");
  }, []);
  return (
    <figure className={`plate plate-${civ} ${className}`} style={{ "--ph": img?.color } as CSSProperties}>
      <div className="plate-frame">
        {img && (
          <img
            ref={ref}
            src={img.src}
            srcSet={img.srcSet}
            sizes={sizes}
            width={img.width}
            height={img.height}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onLoad={(e) => e.currentTarget.classList.add("loaded")}
            onError={(e) => e.currentTarget.classList.add("loaded", "broken")}
          />
        )}
        <span className="plate-sheen" aria-hidden="true" />
      </div>
      <PlateCorners civ={civ} />
      {children}
    </figure>
  );
}
