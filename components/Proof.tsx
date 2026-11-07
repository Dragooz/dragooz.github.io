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
        <div className="proof-built">
            <div className="card proof-stat">
                <span className="proof-stat-number">80%</span>
                <span className="proof-stat-caption">
                    less manual data entry. Before, staff typed it by hand every night. Now the data comes in automatically.
                </span>
            </div>
            {DONE_BEFORE.map((line) => (
                <div key={line.lead} className="card proof-item">
                    <strong>{line.lead}</strong>
                    <p className="tail-muted">{line.tail}</p>
                </div>
            ))}
        </div>
        <span className="eyebrow eyebrow-muted proof-examples-label">Examples for your business</span>
        <ul className="example-cards">
            {BUILD_EXAMPLES.map((example) => (
                <li key={example.name} className="card example-card">
                    <h3>{example.name}</h3>
                    <dl className="example-compare">
                        <div className="example-row">
                            <dt>Now</dt>
                            <dd className="tail-muted">{example.now}</dd>
                        </div>
                        <div className="example-row example-row-after">
                            <dt>After</dt>
                            <dd>{example.after}</dd>
                        </div>
                    </dl>
                    <p className="example-diy">
                        <span className="example-diy-label">Why DIY fails:</span> {example.whyDiyStalls}
                    </p>
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
