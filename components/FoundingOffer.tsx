import React from "react";
import TalkButton from "./TalkButton";

// "Launch price", not "founding": simulated owners read founding / spot counts as "I'm the guinea pig" (2026-11-05).
const OFFER_TERMS: string[] = [
    "Free diagnosis.",
    "One fix, two weeks max.",
    "Pay after 30 days, only if the number moved. Otherwise no invoice.",
    "Retainer only if you want one, at the launch rate.",
];

const FoundingOffer: React.FC = () => (
    <section id="founding-offer" className="section">
        <div className="card offer-card">
            <span className="eyebrow">Launch price</span>
            <h2 className="section-title">
                Pay only <span className="accent">if it worked.</span>
            </h2>
            <p className="offer-line">Normally RM2,000–6,000. Launch price RM1,000–3,000. The work is the same.</p>
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
