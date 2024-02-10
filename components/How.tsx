import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

const How = ({ className = "" }: { className?: string }) => {
    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                "how",
                "how-top-side-line",
                "how-bottom-side-line",
                "how-bottom-side-line-content",
                8
            )
        );

        return () => {
            window.removeEventListener("scroll", () =>
                handleScroll(
                    "how",
                    "how-top-side-line",
                    "how-bottom-side-line",
                    "how-bottom-side-line-content",
                    8
                )
            );
        };
    }, []);

    return (
        <div id="how" style={{ position: "relative", overflow: "hidden" }}>
            <div
                id="how-top-side-line"
                className={`top-side-line`}
                style={{
                    background:
                        "linear-gradient(transparent, rgb(66, 171, 197) 93%,transparent 93%)",
                }}
            />

            <div id="how-bottom-side-line-content">
                <div
                    id="how-bottom-side-line"
                    className={`bottom-side-line`}
                    style={{
                        background:
                            "linear-gradient(transparent,transparent 7%,rgb(66, 171, 197) 7%,rgb(66, 171, 197),transparent)",
                    }}
                />
                <div className="icon-wrapper">
                    <FontAwesomeIcon
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            width: "30px",
                            height: "30px",
                        }}
                        icon={faScrewdriverWrench}
                    />
                </div>
                {/* <div id="how" className={className}>
                    <div>How</div>
                    <div>1. </div>
                    <div>
                        2. Get an overall picture of the problem and solution
                    </div>
                    <div>3. Breakdown the big problems to smaller problems</div>
            <div>4. Solve + Test one by one.</div>
            <div>5. Done! </div>
                    <div>Next JS (FE) + Django (BE)</div>
                </div> */}

                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">How</div>

                        <div className="position position-one">
                            <div className="w-image">
                                <Image
                                    src="/images/big-picture.png"
                                    alt="Big Picture"
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
                                <span>Understand & Big Picture</span>
                                <br />
                                <span>— Step 1</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="w-image">
                                <Image
                                    src="/images/break-down-2.png"
                                    alt="Break down"
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
                                <span>Breakdown Problem & Solution</span>
                                <br />
                                <span>— Step 2</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="w-image">
                                <Image
                                    src="/images/solve-test.png"
                                    alt="Solve & Test"
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
                                <span>Solve & Test!</span> <br />
                                <span>— Step 3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default How;
