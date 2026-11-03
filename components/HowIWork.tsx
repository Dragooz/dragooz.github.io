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
        description: "I’m your tech department. Message me, I handle it. Four hours a month.",
        price: "From RM 1,500 / month",
    },
];

const WONT_DO: string[] = [
    "Waste your time.",
    "Build big when small works.",
    "Charge by the hour or pad the scope.",
    "Make your staff learn a tool they’ll hate.",
    "Say it works when it doesn’t.",
];

const HowIWork: React.FC = () => {
    return (
        <section id="how-i-work" className="pitch-section">
            <span className="pitch-eyebrow">How I work</span>
            <h2 className="pitch-title">Three steps.</h2>
            <div className="work-steps">
                {WORK_STEPS.map((workStep) => (
                    <div key={workStep.number} className="work-step">
                        <span className="work-step-num">{workStep.number}</span>
                        <div className="work-step-body">
                            <div className="work-step-title">{workStep.title}</div>
                            <p className="work-step-desc">{workStep.description}</p>
                            <span className="work-step-price">{workStep.price}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="wont-do">
                <span className="wont-do-title">What I won’t do</span>
                <ul className="wont-do-list">
                    {WONT_DO.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                <p className="wont-do-closing">
                    Lying makes me uncomfortable. If it’s not worth your money, I’ll say so.
                </p>
            </div>
        </section>
    );
};

export default HowIWork;
