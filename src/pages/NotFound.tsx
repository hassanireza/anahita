import { Link } from "react-router-dom";
import { BackgroundCanvas } from "../components/BackgroundCanvas";
import { LostKeystone } from "../art/sigils";
import { Icon } from "../art/core";

export function NotFound() {
  return (
    <>
      <BackgroundCanvas theme="home" />
      <main className="page-wrapper not-found">
        <LostKeystone />
        <h1>404</h1>
        <p>The keystone of this arch has not been laid. This corner of the archive has not been written yet.</p>
        <Link to="/" className="btn btn-gold"><Icon name="arrow-left" size={14} /> Return to Anahita</Link>
      </main>
    </>
  );
}
