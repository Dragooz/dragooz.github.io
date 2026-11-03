import React from "react";
import Head from "next/head";
import Hero from "./Hero";
import SoundFamiliar from "./SoundFamiliar";
import WhatItTakes from "./WhatItTakes";
import BuildExamples from "./BuildExamples";
import HowIWork from "./HowIWork";
import MidCta from "./MidCta";
import AboutMe from "./AboutMe";
import FoundingOffer from "./FoundingOffer";
import Footer from "./Footer";

const Home: React.FC = () => (
    <>
        <Head>
            <title>Yi Chong | Engineer for business owners</title>
            <meta
                name="description"
                content="For owners who are tired of tech. I learn how your business runs, then build what holds up on real data. Free diagnosis, pay only if it worked."
            />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        </Head>
        <main className="page">
            <Hero />
            <AboutMe />
            <SoundFamiliar />
            <WhatItTakes />
            <MidCta />
            <BuildExamples />
            <HowIWork />
            <FoundingOffer />
            <Footer />
        </main>
    </>
);

export default Home;
