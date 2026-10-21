import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoMark, Icon } from "../art/core";
import { Crest } from "../art/emblems";

const LINKS = [
  { to: "/persia", label: "Persia", civ: "persia", sub: "Wisdom · The Sacred Flame" },
  { to: "/egypt", label: "Egypt", civ: "egypt", sub: "Strength · The Eternal Nile" },
  { to: "/greek", label: "Greece", civ: "greek", sub: "Beauty · Mount Olympus" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("scroll-locked", open);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.classList.remove("scroll-locked");
    };
  }, [open]);

  return (
    <>
      <nav className={`site-nav${scrolled ? " scrolled" : ""}`} aria-label="Primary">
        <NavLink to="/" className="nav-logo" aria-label="Anahita, home">
          <LogoMark size={34} />
          <span>ANAHITA</span>
        </NavLink>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => (isActive ? "active" : "")}>{l.label}</NavLink>
            </li>
          ))}
        </ul>
        <button className="nav-burger" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1}><Icon name="close" size={20} /></button>
        <div className="mobile-links">
          {LINKS.map((l, i) => (
            <NavLink key={l.to} to={l.to} data-civ={l.civ} style={{ ["--i" as string]: i }} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <Crest civ={l.civ} />
              <span><b>{l.label}</b><small>{l.sub}</small></span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
