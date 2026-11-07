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
    who: string; // e.g. "Owner, [business type], [city]"
}

// Only things that have actually happened. All built as an employee, not for clients:
// never word them as client results until a real client exists (2026-11-05).
const DONE_BEFORE: ProofLine[] = [
    { lead: "Automatic payment reminders.", tail: "The system sends reminders until the customer pays." },
    { lead: "All data in 1 place.", tail: "Records from many tools go to 1 place. Staff type each record 1 time." },
];

const BUILD_EXAMPLES: BuildExample[] = [
    {
        name: "The weekly report",
        now: "Every Monday, staff export data, paste it into Excel, correct the columns and send it.",
        after: "The system makes the report at night. It is in your inbox at 8am.",
        whyDiyStalls: "The export format changes. Then the macro fails and nobody sees it.",
    },
    {
        name: "Who did not pay",
        now: "Staff compare bank payments with invoices. Then they type each reminder.",
        after: "The unpaid list updates every day. The system sends the reminders.",
        whyDiyStalls: "Sending the email is easy. Matching payments to invoices is difficult.",
    },
];

// TODO: paste a quote only after the real client approves the wording. Renders nothing while empty.
// Never invent one: the owner this page is for will check.
const TESTIMONIALS: Testimonial[] = [];

const Proof: React.FC = () => (
    <section className="section">
        <span className="eyebrow">What I built before</span>
        <h2 className="section-title">These systems are in daily use.</h2>
        <div className="proof-grid">
            <div className="proof-stat">
                <span className="proof-stat-number">80%</span>
                <span className="proof-stat-caption">
                    less manual data entry. Before, staff typed it by hand every night. Now the data comes in automatically.
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
                <span className="eyebrow eyebrow-muted">Examples for your business</span>
                <ul className="example-lines">
                    {BUILD_EXAMPLES.map((example) => (
                        <li key={example.name}>
                            <h3>{example.name}</h3>
                            <dl className="example-body">
                                <dt>Now</dt>
                                <dd>{example.now}</dd>
                                <dt>After</dt>
                                <dd>{example.after}</dd>
                                <dt>Why DIY fails</dt>
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
