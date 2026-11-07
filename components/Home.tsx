import React, { useEffect } from "react";
import Head from "next/head";
import Hero from "./Hero";
import SoundFamiliar from "./SoundFamiliar";
import HowIWork from "./HowIWork";
import Proof from "./Proof";
import FoundingOffer from "./FoundingOffer";
import Footer from "./Footer";

// Sections fade up a few pixels as they enter. Without JS nothing is ever hidden:
// the hiding rule only applies once <body> carries `reveal-ready`.
function useSectionReveal(): void {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        document.body.classList.add("reveal-ready");
        const sections = Array.from(document.querySelectorAll<HTMLElement>(".section, .footer"));
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: "0px 0px -10% 0px" },
        );
        sections.forEach((section) => observer.observe(section));
        return () => {
            observer.disconnect();
            document.body.classList.remove("reveal-ready");
        };
    }, []);
}

const Home: React.FC = () => {
    useSectionReveal();
    return (
        <>
            <Head>
                <title>Yi Chong | Engineer for business owners</title>
                <meta
                    name="description"
                    content="I automate the work your team does by hand. I learn how your business works first. The first call is free. You pay only if it works."
                />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            </Head>
            <main className="page">
                <Hero />
                <SoundFamiliar />
                <HowIWork />
                <Proof />
                <FoundingOffer />
                <Footer />
            </main>
        </>
    );
};

export default Home;
