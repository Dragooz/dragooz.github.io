import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { LuAward, LuDatabase, LuMapPin, LuPlus, LuZap, LuFileSpreadsheet, LuGraduationCap, LuShoppingBag, LuStethoscope, LuUtensils, LuWarehouse } from "react-icons/lu";
import { SiGooglesheets, SiShopee, SiWhatsapp } from "react-icons/si";
import TalkButton from "./TalkButton";

interface Chip {
    label: string;
    Icon: IconType;
    open?: boolean; // dashed chip: the list is examples, not a limit
}

const WHO_FOR: Chip[] = [
    { label: "F&B", Icon: LuUtensils },
    { label: "Tuition centres", Icon: LuGraduationCap },
    { label: "Clinics", Icon: LuStethoscope },
    { label: "Wholesalers", Icon: LuWarehouse },
    { label: "Online sellers", Icon: LuShoppingBag },
    { label: "Any business that runs on Excel or WhatsApp", Icon: LuPlus, open: true },
];

const WORKS_WITH: Chip[] = [
    { label: "Excel", Icon: LuFileSpreadsheet },
    { label: "Google Sheets", Icon: SiGooglesheets },
    { label: "WhatsApp", Icon: SiWhatsapp },
    { label: "AutoCount", Icon: LuDatabase },
    { label: "SQL Account", Icon: LuDatabase },
    { label: "Shopee", Icon: SiShopee },
];

const ChipRow: React.FC<{ chips: Chip[]; label: string; className?: string }> = ({ chips, label, className = "" }) => (
    <div className={`chip-group ${className}`}>
        <span className="chip-group-label">{label}</span>
        <ul className="chip-row">
            {chips.map(({ label: chipLabel, Icon, open }) => (
                <li key={chipLabel} className={`chip${open ? " chip-open" : ""}`}>
                    <Icon aria-hidden="true" />
                    {chipLabel}
                </li>
            ))}
        </ul>
    </div>
);

const KICKER_TEXT = "Hi, I am Yi Chong, an engineer.";
const TYPING_MS_PER_CHAR = 45;

// Facts an owner can check. Character lives in the won't-do list, not here.
const HERO_FACTS: Chip[] = [
    { label: "My last automation removed 80% of the manual work.", Icon: LuZap },
    { label: "I have an AI degree from University Malaya. I worked in fintech, AI consulting and a Big Four firm.", Icon: LuAward },
    { label: "I work remotely across Malaysia, or on-site if you ask. I speak English, Bahasa Melayu and Chinese (中文).", Icon: LuMapPin },
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
        <ChipRow chips={WHO_FOR} label="For example" className="hero-for" />
        <p className="hero-line">
            The first call is free. The price is fixed. You pay only if it works.
        </p>
        <TalkButton />
        <p className="hero-cta-note">You send 1 message. I reply the same business day. No obligation.</p>
        <ChipRow chips={WORKS_WITH} label="I build on the tools you use now" className="hero-tools" />
        <ul className="hero-facts">
            {HERO_FACTS.map(({ label, Icon }) => (
                <li key={label}>
                    <Icon className="hero-fact-icon" aria-hidden="true" />
                    <span>{label}</span>
                </li>
            ))}
        </ul>
    </section>
);

export default Hero;
