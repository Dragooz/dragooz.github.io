import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, useState } from "react";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { handleScroll } from "./Introduction";
import CustomResponsiveImage from "./CustomResponsiveImage";

const Who = ({ className = "" }: { className?: string }) => {
    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                "who",
                "who-top-side-line",
                "who-bottom-side-line",
                "who-bottom-side-line-content",
                1
            )
        );

        return () => {
            window.removeEventListener("scroll", () =>
                handleScroll(
                    "who",
                    "who-top-side-line",
                    "who-bottom-side-line",
                    "who-bottom-side-line-content",
                    1
                )
            );
        };
    }, []);

    return (
        <div id="who" style={{ position: "relative", overflow: "hidden" }}>
            <div id="who-top-side-line" className={`top-side-line`} />

            <div id="who-bottom-side-line-content">
                <div id="who-bottom-side-line" className={`bottom-side-line`} />
                <div className="icon-wrapper">
                    <FontAwesomeIcon
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            width: "30px",
                            height: "30px",
                        }}
                        icon={faPersonFalling}
                    />
                </div>

                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">Who</div>
                        <div className="position position-one">
                            {/* <div className="normal-content"> */}
                            <div className="w-image">
                                <CustomResponsiveImage
                                    src="/images/um.png"
                                    alt="UM Image"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>University Malaya</span>
                                <br />
                                <span>— Artificial Intelligence</span>
                            </div>
                            {/* </div> */}
                            {/* <div className="hover-content">
                                <div>Hackathon</div>
                            </div> */}
                        </div>
                        <div className="position position-two">
                            <div className="w-image">
                                <CustomResponsiveImage
                                    src="/images/problem-solving.png"
                                    alt="Problem Solving"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Problem Solver</span> <br />
                                <span>— Loves Challenges</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="w-image">
                                <CustomResponsiveImage
                                    src="/images/logic.png"
                                    alt="Logic Image"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Logical Thinker</span> <br />
                                <span>— Structural Mindset</span>
                            </div>
                        </div>
                    </div>
                    {/* <div>Who</div> */}
                </div>
            </div>
        </div>
    );
};

export default Who;
