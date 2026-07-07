import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/main.css";
import "./styles/pages.css";
import "./styles/enhancements.css";

// Restore the original deep-link path saved by public/404.html's
// redirect script, so a hard refresh on /anahita/persia works even
// though GitHub Pages has no server-side router.
const redirect = new URLSearchParams(window.location.search).get("redirect");
if (redirect) {
  const target = redirect.startsWith("/") ? redirect : `/${redirect}`;
  window.history.replaceState(null, "", target);
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
