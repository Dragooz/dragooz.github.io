import React, { useRef, useEffect } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

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
                className={`top-side-line`}
                style={{
                    background:
                        "linear-gradient(transparent, rgb(63, 77, 185) 93%,transparent 93%)",
                }}
            />

            <div id="what-bottom-side-line-content">
                <div
                    id="what-bottom-side-line"
                    className={`bottom-side-line`}
                    style={{
                        background:
                            "linear-gradient(transparent,transparent 7%,rgb(63, 77, 185) 7%,rgb(63, 77, 185),transparent)",
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
                        icon={faDiagramProject}
                    />
                </div>
                {/* <div id="what" className={className}>
                    <div></div>
                    <div>Map System for farmer in agriculture domain</div>
                    <div>
                        
                    </div>
                </div> */}

                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">What</div>

                        <div className="position position-one">
                            <div className="w-image">
                                <Image
                                    src="/images/forecast-efw.png"
                                    alt="Forecasting Estimated Fetal Weight"
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
                                <span>Forecast Fetal Weight</span>
                                <br />
                                <span>2021-2022</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="w-image">
                                <Image
                                    src="/images/ainari-logo-square.png"
                                    alt="AINari"
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
                                <span>Agriculture Map System</span> <br />
                                <span>— 2022</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="w-image">
                                <Image
                                    src="/images/uu-logo.png"
                                    alt="UtterUnicorn"
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
                                <span>UtterUnicorn</span> <br />
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
