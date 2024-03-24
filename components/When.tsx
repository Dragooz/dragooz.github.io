import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonFalling, faClock } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import CustomResponsiveImage from "./CustomResponsiveImage";

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
                className={`top-side-line top-side-line-when`}
            />

            <div id="when-bottom-side-line-content">
                <div
                    id="when-bottom-side-line"
                    className={`bottom-side-line bottom-side-line-when`}
                />
                <div className="icon-wrapper">
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

                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">When & Where</div>
                        <div className="position position-one">
                            <div className="border-clickable w-image border-clickable-when">
                                <CustomResponsiveImage
                                    src="/images/topglove-whitebg.png"
                                    alt="TopGlove Logo"
                                    width={350}
                                    height={350}
                                />
                            </div>

                            <div className="card-font-style">
                                <span>Data Science Intern</span>
                                <br />
                                <span>— 2019-2022</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="border-clickable w-image border-clickable-when">
                                <CustomResponsiveImage
                                    src="/images/deloitte-logo-square.png"
                                    alt="Logic Image"
                                    width={350}
                                    height={350}
                                />
                            </div>

                            <div className="card-font-style">
                                <span>Consulting TS&T</span> <br />
                                <span>— 2022 - 2022</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="border-clickable w-image border-clickable-when">
                                <CustomResponsiveImage
                                    src="/images/reluvate-logo.png"
                                    alt="Logic Image"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Software Engineer</span> <br />
                                <span>— 2022-Present</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default When;
