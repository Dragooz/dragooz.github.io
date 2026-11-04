import React from "react";
import Image from "next/image";

interface AboutLine {
    lead: string;
    tail: string;
}

// Facts an owner can check. No adjectives: character lives in the won't-do section.
const ABOUT_LINES: AboutLine[] = [
    { lead: "Full-stack engineer at a Malaysian fintech.", tail: "Onboarding, cards, payables. 2024 to present." },
    { lead: "Before that:", tail: "AI and automation systems at a Singapore consultancy. Technology strategy at a Big Four firm." },
    { lead: "AI graduate, University Malaya.", tail: "" },
    { lead: "Last automation shipped: 80% less manual work.", tail: "F&B business, Malaysia." },
];

const AboutMe: React.FC = () => (
    <section id="me" className="section about">
        <Image src="/images/yc-logo.png" alt="" width={497} height={438} className="about-monogram" aria-hidden="true" />
        <span className="eyebrow">Me</span>
        <h2 className="section-title">
            Business and engineering. <span className="accent">One person, no translator.</span>
        </h2>
        <ul className="about-lines">
            {ABOUT_LINES.map((line) => (
                <li key={line.lead}>
                    <strong>{line.lead}</strong>
                    {line.tail && <> <span className="tail-muted">{line.tail}</span></>}
                </li>
            ))}
        </ul>
    </section>
);

export default AboutMe;
