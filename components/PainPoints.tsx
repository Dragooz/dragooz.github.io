import React from "react";

// For the owner who already tried DIY and AI tools. One line each.
const DIY_STALL_POINTS: string[] = [
    "ChatGPT wrote the script. It broke on real data.",
    "Zapier works, until the exception. Then it’s manual again.",
    "The SaaS does 80%. Your business is the other 20%.",
    "Three Google Sheets. One formula nobody dares touch.",
    "It worked in the demo. Production needs 99%, every day.",
];

const PainPoints: React.FC = () => {
    return (
        <section id="pain-points" className="pitch-section">
            <span className="pitch-eyebrow">You already tried</span>
            <h2 className="pitch-title">80% done is where it breaks.</h2>
            <ul className="pain-list">
                {DIY_STALL_POINTS.map((stallPoint) => (
                    <li key={stallPoint} className="pain-item">
                        {stallPoint}
                    </li>
                ))}
            </ul>
            <p className="pitch-closing">
                The gap isn’t effort. It’s knowing what breaks first, and building so it doesn’t. That’s my job.
            </p>
        </section>
    );
};

export default PainPoints;
