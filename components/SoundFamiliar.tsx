import React from "react";

interface PainLine {
    lead: string;
    tail: string;
}

// Chores first: owners who never tried ChatGPT or Zapier must see themselves before the DIY column.
const TRIED_IT_YOURSELF: PainLine[] = [
    { lead: "ChatGPT wrote a script.", tail: "It failed on real data." },
    { lead: "Zapier worked.", tail: "Then the first exception stopped it." },
    { lead: "The software does 80% of the job.", tail: "It does not do your last 20%." },
    { lead: "You have 3 Google Sheets.", tail: "1 formula breaks if someone changes it." },
];

const CHORES_STILL_BY_HAND: PainLine[] = [
    { lead: "You type the same data 2 times.", tail: "First in Excel, then in the system." },
    { lead: "You make the same report.", tail: "Every week." },
    { lead: "You check who did not pay.", tail: "1 line at a time." },
    { lead: "You copy data from 1 tool to another.", tail: "All day." },
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
        <span className="eyebrow">Is this you?</span>
        <h2 className="section-title">
            You do not need more tools. You need tools that fit your business.
        </h2>
        <div className="pain-columns">
            <PainColumn label="Work your team does by hand" lines={CHORES_STILL_BY_HAND} tailClassName="tail-muted" />
            <PainColumn label="Tools you tried" lines={TRIED_IT_YOURSELF} tailClassName="tail-broken" />
        </div>
        <p className="section-closing">
            The result is the same: your team still does the work <strong>by hand.</strong>
        </p>
    </section>
);

export default SoundFamiliar;
