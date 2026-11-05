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
    { lead: "Payment chasing, automated.", tail: "Reminders go out on their own until the invoice is paid." },
    { lead: "Scattered data, one source.", tail: "Records from several tools in one place, typed once." },
];

const BUILD_EXAMPLES: BuildExample[] = [
    {
        name: "The weekly report",
        now: "Export, paste into Excel, fix columns, email. Every Monday.",
        after: "Builds itself overnight. In your inbox at 8am.",
        whyDiyStalls: "The export changes and the macro breaks quietly.",
    },
    {
        name: "Who hasn’t paid yet",
        now: "Tick bank credits against invoices, type each reminder.",
        after: "The unpaid list updates daily. Reminders go out on their own.",
        whyDiyStalls: "Matching payments is the hard part, not sending the email.",
    },
];

// TODO: paste a quote only after the real client approves the wording. Renders nothing while empty.
// Never invent one: the owner this page is for will check.
const TESTIMONIALS: Testimonial[] = [];

const Proof: React.FC = () => (
    <section className="section">
        <span className="eyebrow">Built before</span>
        <h2 className="section-title">Already running in production.</h2>
        <div className="proof-grid">
            <div className="proof-stat">
                <span className="proof-stat-number">80%</span>
                <span className="proof-stat-caption">
                    less manual data entry. Typed in by hand every night. Now it flows in on its own.
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
