import React from "react";
import TalkButton from "./TalkButton";

// One price, no "normally / launch" pair and no spot count: simulated owners read both as "he is new" (2026-11-06).
const OFFER_TERMS: string[] = [
    "Free diagnosis.",
    "One fix, two weeks max.",
    "Pay after 30 days, only if the number moved. Otherwise no invoice.",
    "Retainer only if you want one.",
];

const FoundingOffer: React.FC = () => (
    <section id="founding-offer" className="section">
        <div className="card offer-card">
            <span className="eyebrow">The deal</span>
            <h2 className="section-title">
                Pay only <span className="accent">if it worked.</span>
            </h2>
            <p className="offer-line">One fix, RM1,000–3,000, agreed before I start.</p>
            <ul className="offer-terms">
                {OFFER_TERMS.map((term) => (
                    <li key={term}>{term}</li>
                ))}
            </ul>
            <TalkButton />
        </div>
    </section>
);

export default FoundingOffer;
