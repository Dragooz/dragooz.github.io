import React from "react";

interface PainLine {
    lead: string;
    tail: string;
}

// Chores first: owners who never tried ChatGPT or Zapier must see themselves before the DIY column.
const TRIED_IT_YOURSELF: PainLine[] = [
    { lead: "ChatGPT wrote the script.", tail: "It broke on real data." },
    { lead: "Zapier worked.", tail: "Until the first exception." },
    { lead: "The SaaS does 80%.", tail: "Not your 20%." },
    { lead: "Three Google Sheets.", tail: "One formula nobody dares touch." },
];

const CHORES_STILL_BY_HAND: PainLine[] = [
    { lead: "Keying in the same data twice.", tail: "Excel, then the system." },
    { lead: "Rebuilding the same report.", tail: "Every week." },
    { lead: "Chasing who hasn\u2019t paid.", tail: "Line by line." },
    { lead: "Copy-paste between tools.", tail: "All day." },
];

const PainColumn: React.FC<{ label: string; lines: PainLine[]; tailClassName: string }> = ({ label, lines, tailClassName }) => (
    <div className="pain-column">
        <span className="eyebrow eyebrow-muted">{label}</span>
        <ul className="pain-lines">
            {lines.map((line) => (
                <li key={line.lead}>
                    <strong>{line.lead}</strong> <span className={tailClassName}>{line.tail}</span>
                </li>
            ))}
        </ul>
    </div>
);

const SoundFamiliar: React.FC = () => (
    <section className="section">
        <span className="eyebrow">Sound familiar?</span>
        <h2 className="section-title">
            You don’t need more tools. You need them to fit your business.
        </h2>
        <div className="pain-columns">
            <PainColumn label="What fills your week" lines={CHORES_STILL_BY_HAND} tailClassName="tail-muted" />
            <PainColumn label="You tried it yourself" lines={TRIED_IT_YOURSELF} tailClassName="tail-broken" />
        </div>
        <p className="section-closing">
            Either way, the work still gets done <strong>by hand.</strong>
        </p>
    </section>
);

export default SoundFamiliar;
