import React from "react";
import TalkButton from "./TalkButton";

// Update BY HAND when a spot fills. Never show a number that is not true.
const FOUNDING_SPOTS_TOTAL = 3;
const FOUNDING_SPOTS_OPEN = 3;

// "3 of 3 left" reads as nobody wanted one. Show the count only once it has moved.
function foundingSpotsLabel(): string {
    if (FOUNDING_SPOTS_OPEN < FOUNDING_SPOTS_TOTAL) {
        return `Founding rate \u00b7 ${FOUNDING_SPOTS_OPEN} of ${FOUNDING_SPOTS_TOTAL} spots left in 2026`;
    }
    return `Founding rate \u00b7 ${FOUNDING_SPOTS_TOTAL} spots in 2026`;
}

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
            <span className="eyebrow">{foundingSpotsLabel()}</span>
            <h2 className="section-title">
                Pay only <span className="accent">if it worked.</span>
            </h2>
            <p className="offer-line">First three clients at a founding price. The work is the same.</p>
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
