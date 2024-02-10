import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

const Why = ({ className = "" }: { className?: string }) => {
    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                "why",
                "why-top-side-line",
                "why-bottom-side-line",
                "why-bottom-side-line-content",
                6.2
            )
        );

        return () => {
            window.removeEventListener("scroll", () =>
                handleScroll(
                    "why",
                    "why-top-side-line",
                    "why-bottom-side-line",
                    "why-bottom-side-line-content",
                    6.2
                )
            );
        };
    }, []);

    return (
        <div id="why" style={{ position: "relative", overflow: "hidden" }}>
            <div
                id="why-top-side-line"
                className={`top-side-line`}
                style={{
                    background:
                        "linear-gradient(transparent, rgb(66, 171, 197) 93%,transparent 93%)",
                }}
            />

            <div id="why-bottom-side-line-content">
                <div
                    id="why-bottom-side-line"
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
                        icon={faPersonCircleQuestion}
                    />
                </div>
                {/*   <div id="why" className={className}>
                <div>Why</div>
                <div></div>
                <div>Wish to contribute back to the community</div>
                <div>
                    Enjoy the process of slowly building up something good,
                    which is exactly the code process!
                </div>
            </div> */}

                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">Why</div>

                        <div className="position position-one">
                            <div className="w-image">
                                <Image
                                    src="/images/puzzle-solving.png"
                                    alt="Puzzle Solving"
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
                                <span>Puzzle Solving!</span>
                                <br />
                                <span>— Satisfaction</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="w-image">
                                <Image
                                    src="/images/build-good-product.png"
                                    alt="Build Good Product"
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
                                <span>Building up Good Product!</span>
                                <br />
                                <span>— Enjoyable</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="w-image">
                                <Image
                                    src="/images/keen-in-learning.png"
                                    alt="Keen In Learning"
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
                                <span>Keen In Learning!</span> <br />
                                <span>— Growth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Why;
