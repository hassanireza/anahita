import { useEffect, useState } from "react";
import { Icon } from "../art/core";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button className={`back-to-top${visible ? " visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" tabIndex={visible ? 0 : -1}>
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
