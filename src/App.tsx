import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { Home } from "./pages/Home";
import { PersiaPage } from "./pages/PersiaPage";
import { EgyptPage } from "./pages/EgyptPage";
import { GreekPage } from "./pages/GreekPage";
import { NotFound } from "./pages/NotFound";

const TITLES: Record<string, string> = {
  "/": "Anahita, Gods of the Ancient World",
  "/persia": "Persia, Gods of the Sacred Flame | Anahita",
  "/egypt": "Egypt, Gods of the Eternal Nile | Anahita",
  "/greek": "Greece, Gods of Olympus | Anahita",
};

const PAGE_CLASS: Record<string, string> = {
  "/": "",
  "/persia": "persia-page",
  "/egypt": "egypt-page",
  "/greek": "greek-page",
};

function usePageChrome() {
  const location = useLocation();

  useEffect(() => {
    document.title = TITLES[location.pathname] ?? "Anahita, Gods of the Ancient World";
    window.scrollTo(0, 0);

    const pageClass = PAGE_CLASS[location.pathname];
    document.body.className = pageClass ?? "";

    return () => {
      document.body.className = "";
    };
  }, [location.pathname]);
}

export default function App() {
  usePageChrome();
  const location = useLocation();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <div id="main-content" className="route-fade" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persia" element={<PersiaPage />} />
          <Route path="/egypt" element={<EgyptPage />} />
          <Route path="/greek" element={<GreekPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BackToTop />
    </>
  );
}
