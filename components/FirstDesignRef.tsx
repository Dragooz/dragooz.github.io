import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonFalling, faClock } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

const When = ({ className = "" }: { className?: string }) => {
    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                "when",
                "when-top-side-line",
                "when-bottom-side-line",
                "when-bottom-side-line-content",
                3
            )
        );

        return () => {
            window.removeEventListener("scroll", () =>
                handleScroll(
                    "when",
                    "when-top-side-line",
                    "when-bottom-side-line",
                    "when-bottom-side-line-content",
                    3
                )
            );
        };
    }, []);

    return (
        <div id="when" style={{ position: "relative", overflow: "hidden" }}>
            <div
                id="when-top-side-line"
                className={`top-side-line`}
                style={{
                    background:
                        "linear-gradient(transparent, rgb(144, 63, 185) 93%,transparent 93%)",
                }}
            />

            <div id="when-bottom-side-line-content">
                <div
                    id="when-bottom-side-line"
                    className={`bottom-side-line`}
                    style={{
                        background:
                            "linear-gradient(transparent,transparent 7%,rgb(144, 63, 185) 7%,rgb(144, 63, 185),transparent)",
                    }}
                />
                <div className="icon-wrapper" style={{}}>
                    <FontAwesomeIcon
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            width: "30px",
                            height: "30px",
                        }}
                        icon={faClock}
                    />
                </div>
                {/* <div>When</div>
                <div>Top Glove Data Science Team Intern</div>
                <div>
                    Deloitte Consulting - Technology Strategy & Transformation -
                    Analyst
                </div>
                <div>Reluvate Technologies - Software Engineer</div> */}

                <div className={className}>
                    <div className="w-wrapper">
                        <div className="when-am-i">When</div>
                        <div className="position position-one">
                            <div className="w-image">
                                <Image
                                    src="/images/um.png"
                                    alt="UM Image"
                                    quality={75}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    height={350}
                                    width={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>University Malaya</span>
                                <br />
                                <span>— Artificial Intelligence</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="w-image">
                                <Image
                                    src="/images/problem-solving.png"
                                    alt="Logic Image"
                                    quality={75}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    height={350}
                                    width={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Problem Solver</span> <br />
                                <span>— Loves Challenges</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="w-image">
                                <Image
                                    src="/images/logic.png"
                                    alt="Logic Image"
                                    quality={75}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    height={350}
                                    width={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Logical Thinker</span> <br />
                                <span>— Structural Mindset</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default When;
