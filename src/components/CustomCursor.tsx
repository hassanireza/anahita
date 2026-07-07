import { useEffect, useRef } from "react";

/**
 * Recreates the original custom cursor and trailing ring effect.
 * The component owns its own animation frame loop and attaches a
 * lightweight hover listener to interactive elements so the ring
 * expands over cards, links, and buttons, matching the legacy site.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const expand = () => cursor.classList.add("expanded");
    const contract = () => cursor.classList.remove("expanded");

    document.addEventListener("mousemove", handleMove);

    const selector =
      "a, button, .trinity-card, .god-card, .persian-god-card, .egypt-god-card, .greek-god-card, .yazata-card, .cycle-node, .clickable-card";
    const attachHoverListeners = () => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", contract);
      });
    };
    attachHoverListeners();

    const mutationObserver = new MutationObserver(attachHoverListeners);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      mutationObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
