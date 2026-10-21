import { Link } from "react-router-dom";
import { LogoMark, Divider, Icon } from "../art/core";

export function Footer({ showBackLink = false, credit }: { showBackLink?: boolean; credit: string }) {
  return (
    <footer className="site-footer">
      <Divider variant="lodge" />
      <LogoMark size={54} />
      <p className="footer-credit">{credit}</p>
      <nav className="footer-links" aria-label="Footer">
        <Link to="/persia">Persia</Link>
        <Link to="/egypt">Egypt</Link>
        <Link to="/greek">Greece</Link>
      </nav>
      {showBackLink && (
        <Link to="/" className="back-link"><Icon name="arrow-left" size={14} /> Return to Anahita</Link>
      )}
      <p className="footer-motto">Where fire, sand, and marble converge</p>
    </footer>
  );
}
