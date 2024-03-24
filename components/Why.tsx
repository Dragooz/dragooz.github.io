import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import CustomResponsiveImage from "./CustomResponsiveImage";

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
                className={`top-side-line top-side-line-why`}
            />

            <div id="why-bottom-side-line-content">
                <div
                    id="why-bottom-side-line"
                    className={`bottom-side-line bottom-side-line-why`}
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
                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">Why</div>

                        <div className="position position-one">
                            <div className="border-clickable w-image border-clickable-why">
                                <CustomResponsiveImage
                                    src="/images/puzzle-solving.png"
                                    alt="Puzzle Solving"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Puzzle Solving!</span>
                                <br />
                                <span>— Satisfaction</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="border-clickable w-image border-clickable-why">
                                <CustomResponsiveImage
                                    src="/images/build-good-product.png"
                                    alt="Build Good Product"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Building up Good Product!</span>
                                <br />
                                <span>— Enjoyable</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="border-clickable w-image border-clickable-why">
                                <CustomResponsiveImage
                                    src="/images/keen-in-learning.png"
                                    alt="Keen In Learning"
                                    width={350}
                                    height={350}
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
