import React from "react";
import Image from "next/image";

const companies = [
    {
        name: "Deloitte",
        role: "Technology Analyst",
        period: "2022",
        description: "Technology strategy. How large companies decide.",
        logo: "/images/deloitte-logo-square.png",
        industry: "Strategy",
    },
    {
        name: "Reluvate Technologies",
        role: "Full Stack Engineer",
        period: "2022 \u2013 2024",
        description: "AI and automation systems for businesses.",
        logo: "/images/reluvate-logo.png",
        industry: "AI & Automation",
    },
    {
        name: "Swipey",
        role: "Full Stack Engineer",
        period: "2024 \u2013 present",
        description: "Fintech. Cards, expenses and payables for SMEs.",
        logo: "/images/swipey-square-logo.png",
        industry: "Fintech",
    },
];

const TrustBar: React.FC = () => {
    return (
        <div id="trust-bar">
            <span className="pitch-eyebrow">Background</span>
            <h2 className="pitch-title trust-title">Business and engineering. Both.</h2>
            <div className="trust-cards">
                {companies.map((company) => (
                    <div key={company.name} className="trust-card">
                        <div className="trust-card-logo">
                            <Image
                                src={company.logo}
                                alt={company.name}
                                width={64}
                                height={64}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <div className="trust-card-info">
                            <div className="trust-card-header">
                                <h3 className="trust-card-name">
                                    {company.name}
                                </h3>
                                <span className="trust-card-industry">
                                    {company.industry}
                                </span>
                            </div>
                            <span className="trust-card-role">
                                {company.role} · {company.period}
                            </span>
                            <p className="trust-card-desc">
                                {company.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustBar;
