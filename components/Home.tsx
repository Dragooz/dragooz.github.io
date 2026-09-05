import React from "react";
import Introduction from "./Introduction";
import TrustBar from "./TrustBar";
import TechStack from "./TechStack";
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
                <title>I build what you need</title>
                <meta
                    name="description"
                    content="Solo full-stack engineer. I automate the boring, build the complex, and ship fast. Available for freelance and SME projects."
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
                <Introduction
                    className={"content-margin container-content"}
                    openContact={openContact}
                    openWork={() => setActiveNode("what")}
                />
                <TrustBar />
                <SolarSystem activeNode={activeNode} setActiveNode={setActiveNode} />
                <TechStack />
                <Footer openContact={openContact} />
            </div>
        </>
    );
};

export default Home;
