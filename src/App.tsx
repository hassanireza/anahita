import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { ArtSprite } from "./art/core";
import { Home } from "./pages/Home";

// Civilization pages are code-split: the home page ships without the 53-god dataset UI.
const PersiaPage = lazy(() => import("./pages/PersiaPage").then((m) => ({ default: m.PersiaPage })));
const EgyptPage = lazy(() => import("./pages/EgyptPage").then((m) => ({ default: m.EgyptPage })));
const GreekPage = lazy(() => import("./pages/GreekPage").then((m) => ({ default: m.GreekPage })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

const TITLES: Record<string, string> = {
  "/": "Anahita, Gods of the Ancient World",
  "/persia": "Persia, Gods of the Sacred Flame | Anahita",
  "/egypt": "Egypt, Gods of the Eternal Nile | Anahita",
  "/greek": "Greece, Gods of Olympus | Anahita",
};
const PAGE_CLASS: Record<string, string> = { "/persia": "persia-page", "/egypt": "egypt-page", "/greek": "greek-page" };

function usePageChrome() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? "Anahita, Gods of the Ancient World";
    window.scrollTo(0, 0);
    document.body.className = PAGE_CLASS[pathname] ?? "";
    return () => { document.body.className = ""; };
  }, [pathname]);
}

export default function App() {
  usePageChrome();
  const { pathname } = useLocation();
  return (
    <>
      <ArtSprite />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <div id="main-content" className="route-fade" key={pathname}>
        <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/persia" element={<PersiaPage />} />
            <Route path="/egypt" element={<EgyptPage />} />
            <Route path="/greek" element={<GreekPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <BackToTop />
    </>
  );
}
