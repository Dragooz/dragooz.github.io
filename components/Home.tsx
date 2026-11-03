import React from "react";
import Introduction from "./Introduction";
import TrustBar from "./TrustBar";
import PainPoints from "./PainPoints";
import BuildExamples from "./BuildExamples";
import HowIWork from "./HowIWork";
import FoundingOffer from "./FoundingOffer";
import SolarSystem from "./SolarSystem";
import type { NodeId } from "./SolarSystem";
import Footer from "./Footer";
import Head from "next/head";

interface HomeProps {
    activeNode: NodeId | null;
    setActiveNode: (node: NodeId | null) => void;
    openContact: () => void;
}

const Home: React.FC<HomeProps> = ({ activeNode, setActiveNode, openContact }) => {
    return (
        <>
            <Head>
                <title>Yi Chong | Engineer for business owners</title>
                <meta
                    name="description"
                    content="Engineer for business owners. I know business and engineering. Free diagnosis, fixed price, pay only if it worked."
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                />
            </Head>

            <div className="container">
                <Introduction className={"content-margin container-content"} />
                <TrustBar />
                <PainPoints />
                <BuildExamples />
                <HowIWork />
                <FoundingOffer />
                <span className="pitch-eyebrow more-about-me">More about me</span>
                <SolarSystem activeNode={activeNode} setActiveNode={setActiveNode} />
                <Footer openContact={openContact} />
            </div>
        </>
    );
};

export default Home;
