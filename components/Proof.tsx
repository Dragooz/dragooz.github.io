import React from "react";

interface ProofItem {
    lead: string;
    tail: string;
    link?: { label: string; href: string };
}

interface Testimonial {
    quote: string;
    who: string; // e.g. "Owner, F&B business, Kuala Lumpur"
}

// Only things that have actually happened go here.
const PROOF_ITEMS: ProofItem[] = [
    { lead: "Business onboarding, end to end.", tail: "Sign-up to approved account at a fintech: documents, e-signing, consent, review. No PDFs emailed back and forth." },
    { lead: "Finance operations, streamlined.", tail: "Card spend, bill payments and expense exports for SMEs, with the fields their accountants actually ask for." },
    { lead: "80% less manual order entry.", tail: "F&B business, Malaysia. Orders typed by hand every night, now automated. No new app for staff." },
];

// TODO: ask the F&B client for one sentence, then paste it here. Renders nothing while empty.
// Never invent one: the owner this page is for will check.
const TESTIMONIALS: Testimonial[] = [];

const Proof: React.FC = () => (
    <section className="section">
        <span className="eyebrow">Done before</span>
        <h2 className="section-title">
            Not a first attempt. <span className="accent">A first price.</span>
        </h2>
        <ul className="proof-lines">
            {PROOF_ITEMS.map((item) => (
                <li key={item.lead}>
                    <strong>{item.lead}</strong> <span className="tail-muted">{item.tail}</span>
                    {item.link && (
                        <>
                            {" "}
                            <a className="proof-link" href={item.link.href} target="_blank" rel="noopener noreferrer">
                                {item.link.label} ↗
                            </a>
                        </>
                    )}
                </li>
            ))}
        </ul>
        {TESTIMONIALS.length > 0 && (
            <ul className="testimonials">
                {TESTIMONIALS.map((testimonial) => (
                    <li key={testimonial.who} className="card testimonial">
                        <p>“{testimonial.quote}”</p>
                        <span className="tail-muted">{testimonial.who}</span>
                    </li>
                ))}
            </ul>
        )}
    </section>
);

export default Proof;
