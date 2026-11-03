import React from "react";
import Image from "next/image";

interface Employer {
    name: string;
    role: string;
    period: string;
    line: string;
}

const EMPLOYERS: Employer[] = [
    { name: "Swipey", role: "Full Stack Engineer", period: "2024 \u2013 present", line: "Fintech. Cards, expenses and payables for SMEs." },
    { name: "Reluvate Technologies", role: "Full Stack Engineer", period: "2022 \u2013 2024", line: "AI and automation systems for businesses." },
    { name: "Deloitte", role: "Technology Analyst", period: "2022", line: "Technology strategy. How large companies decide." },
];

const AboutMe: React.FC = () => (
    <section id="me" className="section about">
        <Image src="/images/yc-logo.png" alt="" width={497} height={438} className="about-monogram" aria-hidden="true" />
        <span className="eyebrow">Me</span>
        <h2 className="section-title">
            I solve puzzles <span className="accent">for a living.</span>
        </h2>
        <ul className="about-lines">
            <li>
                <strong>Puzzles.</strong> <span className="tail-muted">Untangling a messy problem is the best part of the job.</span>
            </li>
            <li>
                <strong>Business first, code second.</strong> <span className="tail-muted">Describe the problem. I’ll find its shape.</span>
            </li>
            <li>
                <strong>Simple over clever.</strong> <span className="tail-muted">The smallest thing that works, shipped, then improved.</span>
            </li>
            <li>
                <strong>AI graduate, University Malaya.</strong> <span className="tail-muted">Building for businesses since 2022.</span>
            </li>
        </ul>
        <ul className="employers">
            {EMPLOYERS.map((employer) => (
                <li key={employer.name} className="employer">
                    <div className="employer-body">
                        <strong>{employer.name}</strong>
                        <span className="employer-role">
                            {employer.role} · {employer.period}
                        </span>
                        <p>{employer.line}</p>
                    </div>
                </li>
            ))}
        </ul>
    </section>
);

export default AboutMe;
