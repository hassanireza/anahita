import { persiaSymbol, egyptSymbol, greekSymbol } from "./civilizationSymbols";

const SYMBOLS: Record<"persia" | "egypt" | "greek", string> = {
  persia: persiaSymbol,
  egypt: egyptSymbol,
  greek: greekSymbol,
};

export function CivilizationSymbol({ id }: { id: "persia" | "egypt" | "greek" }) {
  return (
    <div className="civ-symbol" dangerouslySetInnerHTML={{ __html: SYMBOLS[id] }} />
  );
}
