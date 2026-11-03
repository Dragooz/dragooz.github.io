import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

// Update BY HAND when a spot fills. Never show a number that is not true.
const FOUNDING_SPOTS_TOTAL = 3;
const FOUNDING_SPOTS_OPEN = 3;

const OFFER_TERMS: string[] = [
    "Free diagnosis.",
    "One fix, two weeks max, at a founding price sized to your business.",
    "Pay after 30 days, only if the number moved. Otherwise no invoice.",
    "Retainer locked at RM 500 a month.",
    "You give me a case study with real numbers.",
];

const FoundingOffer: React.FC = () => {
    return (
        <section id="founding-offer" className="pitch-section">
            <div className="offer-card">
                <span className="pitch-eyebrow">
                    Founding clients · {FOUNDING_SPOTS_OPEN} of {FOUNDING_SPOTS_TOTAL} spots open in 2026
                </span>
                <h2 className="pitch-title">Pay only if it worked.</h2>
                <ul className="offer-terms">
                    {OFFER_TERMS.map((term) => (
                        <li key={term}>{term}</li>
                    ))}
                </ul>
                <p className="offer-why">Why this cheap? I’m building a track record. Three spots, then normal rates.</p>
                <a
                    className="whatsapp-cta"
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaWhatsapp aria-hidden="true" />
                    Claim a spot
                </a>
            </div>
        </section>
    );
};

export default FoundingOffer;
