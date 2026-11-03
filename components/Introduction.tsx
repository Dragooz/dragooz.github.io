import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import AutomationEngine from "./AutomationEngine";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

interface IntroductionProps {
    className?: string;
}

const Introduction = ({ className = "" }: IntroductionProps) => {
    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "You run the business. I run the tech.";

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
        }, 70);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div id="introduction" className={className}>
            <div className="introduction-layout">
                <div className="introduction-content">
                    <div className="hero-intro">
                        Hi, I&apos;m Yi Chong. Engineer.
                    </div>
                    <div className="meet-him shine-text-one">
                        {typedText}
                        {showCursor && <span className="typing-cursor">|</span>}
                    </div>
                    <div className="description">
                        I know business and engineering. You get the result.
                    </div>
                    <div className="hero-ctas">
                        <a
                            className="cta-primary"
                            href={WHATSAPP_CHAT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaWhatsapp aria-hidden="true" />
                            WhatsApp me
                        </a>
                        <button
                            className="cta-secondary"
                            onClick={() => {
                                const el = document.getElementById("how-i-work");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            How it works ↓
                        </button>
                    </div>
                    <div className="scroll-indicator" aria-hidden="true">
                        <span className="scroll-arrow">↓</span>
                    </div>
                </div>
                <AutomationEngine />
            </div>
        </div>
    );
};

export default Introduction;
