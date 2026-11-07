import React, { useEffect, useState } from "react";
import Image from "next/image";
import TalkButton from "./TalkButton";

const KICKER_TEXT = "Hi, I am Yi Chong, an engineer.";
const TYPING_MS_PER_CHAR = 45;

// Facts an owner can check. Character lives in the won't-do list, not here.
const HERO_FACTS: string[] = [
    "I build software from end to end. I worked in fintech, AI consulting and a Big Four firm.",
    "I have a degree in AI from University Malaya.",
    "My last automation removed 80% of the manual work.",
    "I work remotely across Malaysia, or on-site if you ask. I speak English and Bahasa Melayu.",
];

// Terminal-style kicker, typed once on load. Reduced motion shows it whole.
const TypedKicker: React.FC = () => {
    const [typedLength, setTypedLength] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // Deferred so the effect never sets state synchronously; cleared on unmount.
            const showAll = window.setTimeout(
                () => setTypedLength(KICKER_TEXT.length),
                0,
            );
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
            {KICKER_TEXT.slice(0, typedLength)}
            <span className="hero-caret" />
        </p>
    );
};

const Hero: React.FC = () => (
    <section className="hero">
        <Image
            src="/images/yc-logo.png"
            alt=""
            width={497}
            height={438}
            className="hero-monogram"
            aria-hidden="true"
        />
        <TypedKicker />
        <h1 className="hero-title">
            I <span className="accent">automate</span> the work your team still does by hand.
        </h1>
        <p className="hero-line">
            The first call is free. The price is fixed. You pay only if it works.
        </p>
        <TalkButton />
        <ul className="hero-facts">
            {HERO_FACTS.map((fact) => (
                <li key={fact}>{fact}</li>
            ))}
        </ul>
    </section>
);

export default Hero;
