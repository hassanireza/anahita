import type { CosmicCycle } from "../types/mythology";
import { MaatFeather } from "../art/sigils";
import { SigilG, SigilSvg } from "../art/cycleSigils";
import { SectionHead } from "./SectionHead";

const DEITY_OF: Record<string, string> = { Ra: "ra", Atum: "atum", Nun: "nun", Osiris: "osiris", Horus: "horus" };
const CX = 300, CY = 300, R = 206;

export function EgyptCycle({ cycle, onOpen }: { cycle: CosmicCycle; onOpen: (id: string) => void }) {
  const nodes = cycle.nodes.map((n, i) => {
    const a = (i / cycle.nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { ...n, x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R, id: DEITY_OF[n.name] };
  });
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * Math.PI) / 36;
    const l = i % 6 === 0 ? 14 : 7;
    return <path key={i} d={`M${CX + Math.cos(a) * 286} ${CY + Math.sin(a) * 286}L${CX + Math.cos(a) * (286 - l)} ${CY + Math.sin(a) * (286 - l)}`} />;
  });

  return (
    <section className="cycle" data-civ="egypt" aria-labelledby="cycle-title">
      <SectionHead civ="egypt" emblem="egypt-cycle" eyebrow={cycle.eyebrow} title={cycle.title} desc={cycle.description} id="cycle-title" />

      {/* Desktop / tablet: the wheel */}
      <div className="cycle-wheel reveal">
        <svg viewBox="0 0 600 600" role="group" aria-label="The cosmic cycle of Egypt">
          <circle cx={CX} cy={CY} r="298" fill="url(#g-halo)" opacity=".5" />
          <g className="halo-ring halo-cw slow a-line a-thin">{ticks}</g>
          <circle cx={CX} cy={CY} r="292" className="a-line a-thin" />
          <g className="halo-ring halo-ccw"><circle cx={CX} cy={CY} r="250" className="a-line a-thin" strokeDasharray="2 9" /></g>
          <circle cx={CX} cy={CY} r={R} className="a-line" opacity=".5" />
          <g className="cycle-sun halo-cw"><circle cx={CX} cy={CY - R} r="7" fill="url(#g-sun)" /><circle cx={CX} cy={CY - R} r="12" className="a-line a-thin" /></g>
          {nodes.map((n) => (<path key={n.name} d={`M${CX} ${CY}L${n.x.toFixed(1)} ${n.y.toFixed(1)}`} className="a-line a-thin" opacity=".18" />))}
          <circle cx={CX} cy={CY} r="74" fill="#0a0806" className="a-line" />
          <circle cx={CX} cy={CY} r="66" className="a-line a-thin" strokeDasharray="1 4" />
          <foreignObject x={CX - 32} y={CY - 52} width="64" height="64"><div className="cycle-maat"><MaatFeather size={64} /></div></foreignObject>
          <text x={CX} y={CY + 30} className="cycle-center-name" textAnchor="middle">MA'AT</text>
          <text x={CX} y={CY + 46} className="cycle-center-sub" textAnchor="middle">DIVINE ORDER</text>
          {nodes.map((n) => {
            const interactive = !!n.id;
            return (
              <g
                key={n.name}
                className={`cycle-node${interactive ? " is-link" : ""}`}
                transform={`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`}
                {...(interactive ? { role: "button", tabIndex: 0, "aria-label": `${n.name}, ${n.aspect}. Open legend`, onClick: () => onOpen(n.id), onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(n.id); } } } : {})}
              >
                <circle r="46" className="node-disc" />
                <circle r="40" className="a-line a-thin" />
                <g className="sigil" transform="translate(-27 -27) scale(1.125)"><SigilG name={n.name} /></g>
                <text y="66" textAnchor="middle" className="node-name">{n.name}</text>
                <text y="83" textAnchor="middle" className="node-aspect">{n.aspect}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: solar-journey timeline */}
      <ol className="cycle-list">
        {nodes.map((n, i) => (
          <li key={n.name} className="reveal" style={{ ["--i" as string]: i }}>
            <span className="cycle-list-icon"><SigilSvg name={n.name} /></span>
            <span className="cycle-list-text">
              {n.id ? <button onClick={() => onOpen(n.id)}>{n.name}</button> : <b>{n.name}</b>}
              <small>{n.aspect}</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
