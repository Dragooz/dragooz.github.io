import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import CustomResponsiveImage from "./CustomResponsiveImage";

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
                className={`top-side-line top-side-line-how`}
            />

            <div id="how-bottom-side-line-content">
                <div
                    id="how-bottom-side-line"
                    className={`bottom-side-line bottom-side-line-how`}
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
                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">How</div>

                        <div className="position position-one">
                            <div className="border-clickable w-image border-clickable-how">
                                <CustomResponsiveImage
                                    src="/images/big-picture.png"
                                    alt="Big Picture"
                                    width={350}
                                    height={350}
                                />
                            </div>

                            <div className="card-font-style">
                                <span>Understand & Big Picture</span>
                                <br />
                                <span>— Step 1</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="border-clickable w-image border-clickable-how">
                                <CustomResponsiveImage
                                    src="/images/break-down-2.png"
                                    alt="Break down"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Breakdown Problem & Solution</span>
                                <br />
                                <span>— Step 2</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="border-clickable w-image border-clickable-how">
                                <CustomResponsiveImage
                                    src="/images/solve-test.png"
                                    alt="Solve & Test"
                                    width={350}
                                    height={350}
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
