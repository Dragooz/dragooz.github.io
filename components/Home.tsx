import React, { useRef, WheelEvent } from "react";
import SectionOne from "./SectionOne";

const Home = () => {
    return (
        <>
            <div className="container">
                <SectionOne className={"content-margin"} />
                <div id="introduction" className={"introduction-content"}>
                    Meet Yi Chong – a Software Engineer with a zest for
                    problem-solving and logic, and a self-taught artist bringing
                    a creative edge to tech solutions.
                </div>
                <div id="introduction">
                    In this realm where code weaves with creativity, discover a
                    world of software engineering marvels. Let the journey
                    unfold, guiding you through the art and science of
                    transforming ideas into digital realities.
                </div>
                <div className="bg-image animated-element" />
            </div>
        </>
    );
};

export default Home;
