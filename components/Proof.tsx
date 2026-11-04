import React from "react";

interface ProofLine {
    lead: string;
    tail: string;
}

interface BuildExample {
    name: string;
    now: string;
    after: string;
    whyDiyStalls: string;
}

interface Testimonial {
    quote: string;
    who: string; // e.g. "Owner, F&B business, Kuala Lumpur"
}

// Only things that have actually happened.
const DONE_BEFORE: ProofLine[] = [
    { lead: "Business onboarding, end to end.", tail: "Sign-up to approved account at a fintech: documents, e-signing, consent, review." },
    { lead: "Finance operations, streamlined.", tail: "Card spend, bill payments and expense exports, with the fields accountants ask for." },
];

const BUILD_EXAMPLES: BuildExample[] = [
    {
        name: "Customer onboarding, automated",
        now: "Sign-up, welcome, invoice, account. Four people, two days.",
        after: "One form. Minutes.",
        whyDiyStalls: "ChatGPT writes each step. It can’t keep five systems in sync.",
    },
    {
        name: "A finance dashboard from your Excel",
        now: "“Are we making money this month?” takes an afternoon.",
        after: "One screen. Live, from the same file.",
        whyDiyStalls: "Templates fit everyone’s business. Not yours.",
    },
];

// TODO: ask the F&B client for one sentence, then paste it here. Renders nothing while empty.
// Never invent one: the owner this page is for will check.
const TESTIMONIALS: Testimonial[] = [];

const Proof: React.FC = () => (
    <section className="section">
        <span className="eyebrow">Done before</span>
        <h2 className="section-title">Not a first attempt. A first price.</h2>
        <div className="proof-grid">
            <div className="proof-stat">
                <span className="proof-stat-number">80%</span>
                <span className="proof-stat-caption">
                    less manual order entry. F&B business, Malaysia. Orders typed by hand every night, now automated. No new app for staff.
                </span>
            </div>
            <div className="proof-body">
                <ul className="proof-lines">
                    {DONE_BEFORE.map((line) => (
                        <li key={line.lead}>
                            <strong>{line.lead}</strong> <span className="tail-muted">{line.tail}</span>
                        </li>
                    ))}
                </ul>
                <span className="eyebrow eyebrow-muted">What it could look like for you</span>
                <ul className="example-lines">
                    {BUILD_EXAMPLES.map((example) => (
                        <li key={example.name}>
                            <h3>{example.name}</h3>
                            <dl className="example-body">
                                <dt>Now</dt>
                                <dd>{example.now}</dd>
                                <dt>After</dt>
                                <dd>{example.after}</dd>
                                <dt>Why DIY stalls</dt>
                                <dd className="tail-broken">{example.whyDiyStalls}</dd>
                            </dl>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
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
