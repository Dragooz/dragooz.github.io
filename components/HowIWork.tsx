import React from "react";

interface WorkStep {
    number: string;
    title: string;
    description: string;
    price: string;
}

interface WontDoLine {
    lead: string;
    tail: string;
}

const WORK_STEPS: WorkStep[] = [
    {
        number: "01",
        title: "Diagnose",
        description: "Half a day in your operations. Your top three time sinks, and whether they’re worth fixing.",
        price: "Free",
    },
    {
        number: "02",
        title: "Fix",
        description: "The smallest tool that works. Fixed price, two weeks max.",
        price: "Sized to your business",
    },
    {
        number: "03",
        title: "Stay",
        description: "Optional. I’m your tech department. Message me, I handle it. Four hours a month.",
        price: "Sized to your business, only if you want it",
    },
];

const WONT_DO: WontDoLine[] = [
    { lead: "Waste your time.", tail: "A straight answer in the first call, even if it’s “don’t build this”." },
    { lead: "Build big when small works.", tail: "Often the fix is not software at all." },
    { lead: "Charge by the hour or pad the scope.", tail: "One price, agreed before I start." },
    { lead: "Make your staff learn a tool they’ll hate.", tail: "It fits how they already work, or it fails." },
    { lead: "Say it works when it doesn’t.", tail: "You get the real number, good or bad." },
];

const HowIWork: React.FC = () => (
    <section id="how-i-work" className="section">
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">Three steps. One price, agreed up front.</h2>
        <ol className="steps">
            {WORK_STEPS.map((step) => (
                <li key={step.number} className="step">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <span className="step-price">{step.price}</span>
                </li>
            ))}
        </ol>
        <div className="wontdo">
            <h3 className="wontdo-title">What I won’t do</h3>
            <ul className="wontdo-lines">
                {WONT_DO.map((line) => (
                    <li key={line.lead}>
                        <strong>{line.lead}</strong> <span className="tail-muted">{line.tail}</span>
                    </li>
                ))}
            </ul>
            <p className="wontdo-closing">
                Overselling makes me uncomfortable. If it’s not worth your money, <strong>I’ll say so.</strong>
            </p>
        </div>
    </section>
);

export default HowIWork;
