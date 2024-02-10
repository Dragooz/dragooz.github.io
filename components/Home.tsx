import React, { useRef, WheelEvent } from "react";
import Introduction from "./Introduction";
import Who from "./Who";
import When from "./When";
import Where from "./Where";
import What from "./What";
import Why from "./Why";
import How from "./How";

const Home = () => {
    return (
        <>
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
