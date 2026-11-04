import React from "react";

interface PainLine {
    lead: string;
    tail: string;
}

// Left column: the owner who tried DIY. Right column: the owner who never wanted to.
const TRIED_IT_YOURSELF: PainLine[] = [
    { lead: "ChatGPT wrote the script.", tail: "It broke on real data." },
    { lead: "Zapier worked.", tail: "Until the first exception." },
    { lead: "The SaaS does 80%.", tail: "Not your 20%." },
    { lead: "Three Google Sheets.", tail: "One formula nobody dares touch." },
];

const RATHER_NOT_TOUCH_TECH: PainLine[] = [
    { lead: "No time to learn another tool.", tail: "You have a business to run." },
    { lead: "Not sure what to ask a developer for.", tail: "So nothing gets built." },
    { lead: "Vendors sell software.", tail: "You wanted the problem gone." },
    { lead: "Your team copy-pastes all day.", tail: "Between systems that don\u2019t talk." },
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
            <PainColumn label="You tried it yourself" lines={TRIED_IT_YOURSELF} tailClassName="tail-broken" />
            <PainColumn label="You’d rather not touch tech" lines={RATHER_NOT_TOUCH_TECH} tailClassName="tail-muted" />
        </div>
        <p className="section-closing">
            Either way, the work still gets done <strong>by hand.</strong>
        </p>
    </section>
);

export default SoundFamiliar;
