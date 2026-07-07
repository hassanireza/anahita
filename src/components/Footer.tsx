import { Link } from "react-router-dom";

interface FooterProps {
  showBackLink?: boolean;
  credit: string;
}

export function Footer({ showBackLink = false, credit }: FooterProps) {
  return (
    <footer>
      {showBackLink && (
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Return to Anahita
        </Link>
      )}
      <p className="footer-credit">{credit}</p>
    </footer>
  );
}
