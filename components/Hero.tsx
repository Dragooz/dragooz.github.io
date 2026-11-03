import React, { useEffect, useState } from "react";
import TalkButton from "./TalkButton";

const KICKER_TEXT = "hi, i'm yi chong. engineer.";
const TYPING_MS_PER_CHAR = 45;

// Terminal-style kicker, typed once on load. Reduced motion shows it whole.
const TypedKicker: React.FC = () => {
    const [typedLength, setTypedLength] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // Deferred so the effect never sets state synchronously; cleared on unmount.
            const showAll = window.setTimeout(() => setTypedLength(KICKER_TEXT.length), 0);
            return () => window.clearTimeout(showAll);
        }
        const interval = window.setInterval(() => {
            setTypedLength((length) => {
                if (length >= KICKER_TEXT.length) {
                    window.clearInterval(interval);
                    return length;
                }
                return length + 1;
            });
        }, TYPING_MS_PER_CHAR);
        return () => window.clearInterval(interval);
    }, []);

    return (
        <p className="hero-kicker">
            <span className="hero-prompt">$</span> {KICKER_TEXT.slice(0, typedLength)}
            <span className="hero-caret" />
        </p>
    );
};

const Hero: React.FC = () => (
    <section className="hero">
        <TypedKicker />
        <h1 className="hero-title">
            You run the business. <span className="accent">I make it run smoother.</span>
        </h1>
        <p className="hero-line">No tech to learn. No tools to babysit.</p>
        <TalkButton />
    </section>
);

export default Hero;
