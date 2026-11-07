import React from "react";
import type { IconType } from "react-icons";
import { LuCircleCheck, LuCircleX, LuHammer, LuLifeBuoy, LuPhone } from "react-icons/lu";

interface WorkStep {
    number: string;
    title: string;
    description: string;
    price: string;
    Icon: IconType;
}

interface WontDoLine {
    lead: string;
    tail: string;
}

const WORK_STEPS: WorkStep[] = [
    {
        number: "01",
        title: "Free call", Icon: LuPhone,
        description: "We talk for 30 minutes. I find the 3 tasks that take the most time. I tell you if they are worth automating.",
        price: "Free",
    },
    {
        number: "02",
        title: "Fix", Icon: LuHammer,
        description: "I build the smallest tool that does the job. It works with the Excel or Google Sheets you use now. The price is fixed. It takes 2 weeks or less.",
        price: "RM1,000–3,000. Most fixes save more than they cost within a few months.",
    },
    {
        number: "03",
        title: "Support", Icon: LuLifeBuoy,
        description: "Optional. I become your tech team. You send me a message. I do the work. Up to 4 hours each month.",
        price: "RM500–1,500 per month. Only if you want it.",
    },
];

// Promises YiChong confirmed he keeps (2026-11-05). Do not add one he has not confirmed.
// Line 4 matches the site's 'holds up on real data' promise; line 5 (fixed price, overrun is YiChong's cost) confirmed 2026-11-07.
const COUNT_ON: WontDoLine[] = [
    { lead: "Your data stays in your systems.", tail: "I do not copy your data out. I sign an NDA before I start." },
    { lead: "You own the code and every login.", tail: "If I stop, you keep everything. You also get a handover document." },
    { lead: "We agree on 1 result before I start.", tail: "For example, hours each week on the report. If the result does not improve, I send no invoice." },
    { lead: "I test it on your real data.", tail: "It must work on your files and your exceptions before you pay." },
    { lead: "The price does not go up.", tail: "If the work takes longer than 2 weeks, I pay for that time, not you." },
];

const WONT_DO: WontDoLine[] = [
    { lead: "Waste your time.", tail: "You get a clear answer in the first call. Sometimes the answer is: do not build this." },
    { lead: "Build a big system when a small one works.", tail: "Often, the solution is not software." },
    { lead: "Charge by the hour or add extra work.", tail: "You get 1 price before I start." },
    { lead: "Make your staff learn a difficult tool.", tail: "The tool fits how they work now. If it does not, it fails." },
    { lead: "Say it works when it does not.", tail: "You get the real result, good or bad." },
];

const PromiseList: React.FC<{ title: string; lines: WontDoLine[]; Icon: IconType; iconClassName: string }> = ({ title, lines, Icon, iconClassName }) => (
    <div className="card promise-card">
        <h3 className="wontdo-title">{title}</h3>
        <ul className="promise-lines">
            {lines.map((line) => (
                <li key={line.lead}>
                    <Icon className={`promise-icon ${iconClassName}`} aria-hidden="true" />
                    <span>
                        <strong>{line.lead}</strong> <span className="tail-muted">{line.tail}</span>
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

const HowIWork: React.FC = () => (
    <section id="how-i-work" className="section">
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">3 steps. You agree to 1 price before I start.</h2>
        <ol className="steps">
            {WORK_STEPS.map(({ number, title, description, price, Icon }) => (
                <li key={number} className="card step">
                    <div className="step-head">
                        <span className="step-icon">
                            <Icon aria-hidden="true" />
                        </span>
                        <span className="step-number">{number}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className="step-price">{price}</span>
                </li>
            ))}
        </ol>
        <div className="promise-grid">
            <PromiseList title="What you can count on" lines={COUNT_ON} Icon={LuCircleCheck} iconClassName="promise-icon-yes" />
            <PromiseList title="What I will not do" lines={WONT_DO} Icon={LuCircleX} iconClassName="promise-icon-no" />
        </div>
        <p className="wontdo-closing">
            I do not oversell. If it is not worth your money, <strong>I will tell you.</strong>
        </p>
    </section>
);

export default HowIWork;
