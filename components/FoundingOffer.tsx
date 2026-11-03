import React from "react";
import TalkButton from "./TalkButton";

// Update BY HAND when a spot fills. Never show a number that is not true.
const FOUNDING_SPOTS_TOTAL = 3;
const FOUNDING_SPOTS_OPEN = 3;

const OFFER_TERMS: string[] = [
    "Free diagnosis.",
    "One fix, two weeks max, at a founding price sized to your business.",
    "Pay after 30 days, only if the number moved. Otherwise no invoice.",
    "Retainer only if you want one. Founding rate, sized to your business.",
    "You give me a case study with real numbers.",
];

const FoundingOffer: React.FC = () => (
    <section id="founding-offer" className="section">
        <div className="card offer-card">
            <span className="eyebrow">
                Founding clients · {FOUNDING_SPOTS_OPEN} of {FOUNDING_SPOTS_TOTAL} spots open in 2026
            </span>
            <h2 className="section-title">
                Pay only <span className="accent">if it worked.</span>
            </h2>
            <ul className="offer-terms">
                {OFFER_TERMS.map((term) => (
                    <li key={term}>{term}</li>
                ))}
            </ul>
            <TalkButton label="Claim a spot" />
        </div>
    </section>
);

export default FoundingOffer;
