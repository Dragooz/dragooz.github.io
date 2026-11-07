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
        title: "Free call",
        description: "We talk for 30 minutes. I find the 3 tasks that take the most time. I tell you if they are worth automating.",
        price: "Free",
    },
    {
        number: "02",
        title: "Fix",
        description: "I build the smallest tool that does the job. It works with the Excel or Google Sheets you use now. The price is fixed. It takes 2 weeks or less.",
        price: "RM1,000–3,000. Most fixes save more than they cost within a few months.",
    },
    {
        number: "03",
        title: "Support",
        description: "Optional. I become your tech team. You send me a message. I do the work. Up to 4 hours each month.",
        price: "RM500–1,500 per month. Only if you want it.",
    },
];

// Promises YiChong confirmed he keeps (2026-11-05). Do not add one he has not confirmed.
const COUNT_ON: WontDoLine[] = [
    { lead: "Your data stays in your systems.", tail: "I do not copy your data out. I sign an NDA before I start." },
    { lead: "You own the code and every login.", tail: "If I stop, you keep everything. You also get a handover document." },
    { lead: "We agree on 1 result before I start.", tail: "For example, hours each week on the report. If the result does not improve, I send no invoice." },
];

const WONT_DO: WontDoLine[] = [
    { lead: "Waste your time.", tail: "You get a clear answer in the first call. Sometimes the answer is: do not build this." },
    { lead: "Build a big system when a small one works.", tail: "Often, the solution is not software." },
    { lead: "Charge by the hour or add extra work.", tail: "You get 1 price before I start." },
    { lead: "Make your staff learn a difficult tool.", tail: "The tool fits how they work now. If it does not, it fails." },
    { lead: "Say it works when it does not.", tail: "You get the real result, good or bad." },
];

const HowIWork: React.FC = () => (
    <section id="how-i-work" className="section">
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">3 steps. You agree to 1 price before I start.</h2>
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
            <h3 className="wontdo-title">What you can count on</h3>
            <ul className="wontdo-lines">
                {COUNT_ON.map((line) => (
                    <li key={line.lead}>
                        <strong>{line.lead}</strong> <span className="tail-muted">{line.tail}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="wontdo">
            <h3 className="wontdo-title">What I will not do</h3>
            <ul className="wontdo-lines">
                {WONT_DO.map((line) => (
                    <li key={line.lead}>
                        <strong>{line.lead}</strong> <span className="tail-muted">{line.tail}</span>
                    </li>
                ))}
            </ul>
            <p className="wontdo-closing">
                I do not oversell. If it is not worth your money, <strong>I will tell you.</strong>
            </p>
        </div>
    </section>
);

export default HowIWork;
