import React from "react";
import Image from "next/image";

const companies = [
    {
        name: "Deloitte",
        role: "Technology Analyst",
        description:
            "Big 4 consulting firm. Audit, consulting, tax & advisory services across 150+ countries with 450,000+ professionals worldwide.",
        logo: "/images/deloitte-logo-square.png",
        industry: "Consulting",
    },
    {
        name: "Reluvate Technologies",
        role: "Full Stack Engineer",
        description:
            "Singapore-based AI consulting company. Builds bespoke AI systems and automation solutions to help businesses operate more efficiently.",
        logo: "/images/reluvate-logo.png",
        industry: "AI & Automation",
    },
    {
        name: "Swipey",
        role: "Full Stack Engineer",
        description:
            "Malaysian fintech startup. CFO-in-a-box platform with corporate cards, expense tracking, and automated accounts payable for SMEs.",
        logo: "/images/swipey-square-logo.png",
        industry: "Fintech",
    },
];

const TrustBar: React.FC = () => {
    return (
        <div id="trust-bar">
            <span className="trust-label">Previously worked with</span>
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
                                {company.role}
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
