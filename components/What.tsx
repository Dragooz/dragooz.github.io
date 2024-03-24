import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import CustomResponsiveImage from "./CustomResponsiveImage";

const What = ({ className = "" }: { className?: string }) => {
    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                "what",
                "what-top-side-line",
                "what-bottom-side-line",
                "what-bottom-side-line-content",
                4.5
            )
        );

        return () => {
            window.removeEventListener("scroll", () =>
                handleScroll(
                    "what",
                    "what-top-side-line",
                    "what-bottom-side-line",
                    "what-bottom-side-line-content",
                    4.5
                )
            );
        };
    }, []);

    return (
        <div id="what" style={{ position: "relative", overflow: "hidden" }}>
            <div
                id="what-top-side-line"
                className={`top-side-line top-side-line-what`}
            />

            <div id="what-bottom-side-line-content">
                <div
                    id="what-bottom-side-line"
                    className={`bottom-side-line bottom-side-line-what`}
                />
                <div className="icon-wrapper">
                    <FontAwesomeIcon
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            width: "30px",
                            height: "30px",
                        }}
                        icon={faDiagramProject}
                    />
                </div>
                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">What</div>

                        <div className="position position-one">
                            <div className="border-clickable w-image border-clickable-what">
                                <CustomResponsiveImage
                                    src="/images/forecast-efw.png"
                                    alt="Forecasting Estimated Fetal Weight"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Forecast Fetal Weight</span>
                                <br />
                                <span>2021-2022</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="border-clickable w-image border-clickable-what">
                                <CustomResponsiveImage
                                    src="/images/ainari-logo-square-whitebg.png"
                                    alt="AINari"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Agriculture Map System</span> <br />
                                <span>— 2022</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="border-clickable w-image border-clickable-what">
                                <CustomResponsiveImage
                                    src="/images/uu-logo-whitebg.png"
                                    alt="AINari"
                                    width={350}
                                    height={350}
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Next Generation Chatbot</span> <br />
                                <span>— 2023-Present</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default What;
