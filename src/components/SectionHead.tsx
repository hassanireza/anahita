import { Divider, type Civ } from "../art/core";
import { GroupEmblem, type EmblemId } from "../art/sigils";

export function SectionHead({ civ, emblem, eyebrow, title, desc, numeral, id }: { civ: Civ; emblem: EmblemId; eyebrow: string; title: string; desc?: string; numeral?: string; id?: string }) {
  return (
    <div className="section-head reveal" data-civ={civ}>
      <div className="section-emblem">
        <GroupEmblem id={emblem} size={72} />
        {numeral && <span className="section-numeral" aria-hidden="true">{numeral}</span>}
      </div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
      <Divider variant={civ} />
    </div>
  );
}
