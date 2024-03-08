import React, { useRef, WheelEvent } from "react";
import Introduction from "./Introduction";
import Who from "./Who";
import When from "./When";
import Where from "./Where";
import What from "./What";
import Why from "./Why";
import How from "./How";
import Head from "next/head";

const Home = () => {
    return (
        <>
            <Head>
                <title>Yi Chong</title>
                <meta
                    name="description"
                    content="Know about Yi Chong - explore the journey, insights, and expertise that define my online presence."
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
                <Who className={"content-margin container-content content"} />
                <When className={"content-margin container-content content"} />
                {/* <Where className={"content-margin container-content content"} /> */}
                <What className={"content-margin container-content content"} />
                <Why className={"content-margin container-content content"} />
                <How className={"content-margin container-content content"} />

                <div className="bg-image animated-element" />
            </div>
        </>
    );
};

export default Home;
