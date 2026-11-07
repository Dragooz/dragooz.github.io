import React from "react";
import { LuArrowRight, LuCircleCheck, LuClock, LuMail } from "react-icons/lu";

interface ProofLine {
    lead: string;
    tail: string;
}

interface BuildExample {
    name: string;
    now: string;
    after: string;
    whyDiyStalls: string;
    NowMock: React.FC;
    AfterMock: React.FC;
}

// Small drawn screens, not screenshots: they show the shape of the change, with no client data.
const ReportNowMock: React.FC = () => (
    <div className="mock mock-sheet" aria-hidden="true">
        {[0, 1, 2, 3].map((row) => (
            <div key={row} className={`mock-sheet-row${row === 0 ? " mock-sheet-head" : ""}`}>
                <i />
                <i className={row === 2 ? "mock-cell-bad" : ""} />
                <i />
            </div>
        ))}
        <span className="mock-tag mock-tag-bad">
            <LuClock /> Every Monday
        </span>
    </div>
);

const ReportAfterMock: React.FC = () => (
    <div className="mock mock-notify" aria-hidden="true">
        <LuMail className="mock-notify-icon" />
        <div className="mock-notify-text">
            <strong>Weekly report</strong>
            <span>In your inbox · 8:00am</span>
        </div>
        <LuCircleCheck className="mock-ok" />
    </div>
);

const PaymentNowMock: React.FC = () => (
    <div className="mock mock-match" aria-hidden="true">
        <div className="mock-col">
            <span>Bank</span>
            <i />
            <i />
            <i />
        </div>
        <span className="mock-q">?</span>
        <div className="mock-col">
            <span>Invoices</span>
            <i />
            <i />
            <i />
        </div>
    </div>
);

const PaymentAfterMock: React.FC = () => (
    <ul className="mock mock-list" aria-hidden="true">
        <li>
            <span>Customer A</span>
            <span className="mock-pill">Reminder sent</span>
        </li>
        <li>
            <span>Customer B</span>
            <span className="mock-pill">Reminder sent</span>
        </li>
        <li>
            <span>Customer C</span>
            <span className="mock-pill mock-pill-ok">
                <LuCircleCheck /> Paid
            </span>
        </li>
    </ul>
);

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
        NowMock: ReportNowMock,
        AfterMock: ReportAfterMock,
    },
    {
        name: "Who did not pay",
        now: "Staff compare bank payments with invoices. Then they type each reminder.",
        after: "The unpaid list updates every day. The system sends the reminders.",
        whyDiyStalls: "Sending the email is easy. Matching payments to invoices is difficult.",
        NowMock: PaymentNowMock,
        AfterMock: PaymentAfterMock,
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
            {BUILD_EXAMPLES.map(({ name, now, after, whyDiyStalls, NowMock, AfterMock }) => (
                <li key={name} className="card example-card">
                    <h3>{name}</h3>
                    <dl className="example-flow">
                        <div className="example-pane">
                            <dt>Now</dt>
                            <NowMock />
                            <dd className="tail-muted">{now}</dd>
                        </div>
                        <LuArrowRight className="example-arrow" aria-hidden="true" />
                        <div className="example-pane example-pane-after">
                            <dt>After</dt>
                            <AfterMock />
                            <dd>{after}</dd>
                        </div>
                    </dl>
                    <p className="example-diy">
                        <span className="example-diy-label">Why DIY fails:</span> {whyDiyStalls}
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
