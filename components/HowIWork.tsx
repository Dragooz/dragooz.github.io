import React from "react";

interface WorkStep {
    number: string;
    title: string;
    description: string;
    price: string;
}

const WORK_STEPS: WorkStep[] = [
    {
        number: "01",
        title: "Diagnose",
        description: "Half a day in your operations. Your top three time sinks, and whether they\u2019re worth fixing.",
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
        description: "Optional. I\u2019m your tech department. Message me, I handle it. Four hours a month.",
        price: "From RM 1,500 / month, only if you want it",
    },
];

const WONT_DO: string[] = [
    "Waste your time.",
    "Build big when small works.",
    "Charge by the hour or pad the scope.",
    "Make your staff learn a tool they\u2019ll hate.",
    "Say it works when it doesn\u2019t.",
];

const HowIWork: React.FC = () => (
    <section className="section">
        <span className="eyebrow">How I work</span>
        <h2 className="section-title">
            Diagnose, fix, stay. <span className="accent">One price, agreed up front.</span>
        </h2>
        <ol className="steps">
            {WORK_STEPS.map((step) => (
                <li key={step.number} className="card step">
                    <span className="eyebrow eyebrow-muted">{step.number}</span>
                    <div className="step-body">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                    <span className="step-price">{step.price}</span>
                </li>
            ))}
        </ol>
        <div className="wont-do">
            <span className="eyebrow eyebrow-muted">What I won’t do</span>
            <ul className="wont-do-list">
                {WONT_DO.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <p className="section-closing">
                Lying makes me uncomfortable. If it’s not worth your money, <strong>I’ll say so.</strong>
            </p>
        </div>
    </section>
);

export default HowIWork;
