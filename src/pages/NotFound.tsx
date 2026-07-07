import { Link } from "react-router-dom";
import { BackgroundCanvas } from "../components/BackgroundCanvas";

export function NotFound() {
  return (
    <>
      <BackgroundCanvas theme="home" />
      <main className="page-wrapper">
        <div className="not-found">
          <h1>404</h1>
          <p>This corner of the archive has not been written yet.</p>
          <Link to="/" className="back-link">
            Return to Anahita
          </Link>
        </div>
      </main>
    </>
  );
}
