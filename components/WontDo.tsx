import React from "react";

interface WontDoLine {
    lead: string;
    tail: string;
}

const WONT_DO: WontDoLine[] = [
    { lead: "Waste your time.", tail: "A straight answer in the first call, even if it’s “don’t build this”." },
    { lead: "Build big when small works.", tail: "Often the fix is not software at all." },
    { lead: "Charge by the hour or pad the scope.", tail: "One price, agreed before I start." },
    { lead: "Make your staff learn a tool they’ll hate.", tail: "It fits how they already work, or it fails." },
    { lead: "Say it works when it doesn’t.", tail: "You get the real number, good or bad." },
];

const WontDo: React.FC = () => (
    <section className="section">
        <span className="eyebrow">Straight talk</span>
        <h2 className="section-title">
            Five things <span className="accent">I won’t do.</span>
        </h2>
        <ul className="wontdo-lines">
            {WONT_DO.map((line) => (
                <li key={line.lead}>
                    <strong>{line.lead}</strong> <span className="tail-muted">{line.tail}</span>
                </li>
            ))}
        </ul>
        <p className="wontdo-closing">
            Overselling makes me uncomfortable. If it’s not worth your money, <strong>I’ll say so.</strong>
        </p>
    </section>
);

export default WontDo;
