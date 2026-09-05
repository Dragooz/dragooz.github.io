import React, { useEffect, useState } from "react";

interface IntroductionProps {
    className?: string;
    openContact?: () => void;
    openWork: () => void;
}

const Introduction = ({ className = "", openContact, openWork }: IntroductionProps) => {
    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "I build what you need.";

    // Typing animation effect
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setShowCursor(false), 500);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div id="introduction" className={className}>
            <div className={"introduction-content"}>
                <div className="hero-intro">
                    Hi, I&apos;m Yi Chong — solo full-stack engineer.
                </div>
                <div className="meet-him shine-text-one">
                    {typedText}
                    {showCursor && <span className="typing-cursor">|</span>}
                </div>
                <div className="description">
                    If your team does it 10+ times a week &mdash; I build the
                    system that replaces it.
                </div>
                <div className="hero-ctas">
                    <button
                        className="cta-primary"
                        onClick={openContact}
                    >
                        Get In Touch
                    </button>
                    <button
                        className="cta-secondary"
                        onClick={() => {
                            openWork();
                            const el = document.getElementById("solar-system");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        See My Work ↓
                    </button>
                </div>
                <div className="scroll-indicator" aria-hidden="true">
                    <span className="scroll-arrow">↓</span>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
