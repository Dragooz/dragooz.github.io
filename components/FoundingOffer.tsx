import React from "react";
import TalkButton from "./TalkButton";

// One price, no "normally / launch" pair and no spot count: simulated owners read both as "he is new" (2026-11-06).
const OFFER_TERMS: string[] = [
    "The first call is free.",
    "1 fix takes 2 weeks or less.",
    "You pay after 30 days, only if the result improves. If not, I send no invoice.",
    "Monthly support is optional.",
];

const FoundingOffer: React.FC = () => (
    <section id="founding-offer" className="section">
        <div className="card offer-card">
            <span className="eyebrow">The offer</span>
            <h2 className="section-title">
                Pay only <span className="accent">if it works.</span>
            </h2>
            <p className="offer-line">1 fix costs RM1,000–3,000. We agree on the price before I start.</p>
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
