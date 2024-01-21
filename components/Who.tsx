import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, useState } from "react";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Who = ({ className = "" }: { className?: string }) => {
    useEffect(() => {
        const handleScroll = () => {
            const topSection = document.getElementById("who-top-side-line");
            let clipPercent = 0;
            if (topSection) {
                const topSectionHeight = topSection.offsetHeight;
                const topScrollPosition = window.scrollY;

                // console.log("topSectionHeight: ", topSectionHeight);
                // console.log("topScrollPosition: ", topScrollPosition);
                // console.log(
                //     "topScrollPosition > topSectionHeight / 2: ",
                //     topScrollPosition > topSectionHeight / 2
                // );

                let clipPercent = Math.min(
                    (topScrollPosition / topSectionHeight) * 65,
                    100
                );
                if (topScrollPosition > topSectionHeight / 3) {
                    // Adjust the clip-path style to reveal a portion of the section
                    topSection.style.clipPath = `inset(0 0 ${
                        100 - clipPercent
                    }% 0)`;
                } else {
                    // Reset the clip-path to hide the section
                    topSection.style.clipPath = "inset(0 0 100% 0)";
                }

                // if (topScrollPosition > topSectionHeight / 2) {
                //     const keyframes = {
                //         transform: [
                //             `translateY(-${Math.min(
                //                 (topScrollPosition / topSectionHeight) * 100,
                //                 100
                //             )}%)`,
                //             "translateY(0)",
                //         ],
                //     };
                //     topSection.animate(keyframes, {
                //         duration: 800,
                //         fill: "both",
                //     });
                // } else {
                //     const keyframes = {
                //         transform: ["translateY(0)", "translateY(-100%)"],
                //     };
                //     topSection.animate(keyframes, {
                //         duration: 800,
                //         fill: "both",
                //     });
                // }
                const bottomSectionLine = document.getElementById(
                    "who-bottom-side-line"
                );
                if (bottomSectionLine) {
                    if (clipPercent == 100) {
                        // Adjust the clip-path style to reveal a portion of the section
                        bottomSectionLine.style.clipPath = `inset(0 0 0 0)`;
                    } else {
                        // Reset the clip-path to hide the section
                        bottomSectionLine.style.clipPath = "inset(0 0 100% 0)";
                    }
                }

                const bottomSection = document.getElementById(
                    "who-bottom-side-line-content"
                );
                if (bottomSection) {
                    if (clipPercent == 100) {
                        // Adjust the clip-path style to reveal a portion of the section
                        bottomSection.style.opacity = "1";
                    } else {
                        // Reset the clip-path to hide the section
                        bottomSection.style.opacity = "0";
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
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
                    <div className="who-wrapper">
                        {/* <div className="who-am-i">Who am I</div> */}
                        <div className="position position-one">
                            <div className="who-image">
                                <Image
                                    src="/images/um.png"
                                    alt="UM Image"
                                    width={350}
                                    height={350}
                                    quality={75}
                                    layout="responsive" // or other layout options
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Artificial Intelligence</span>
                                <br />
                                <span>— University Malaya</span>
                            </div>
                        </div>
                        <div className="position position-two">
                            <div className="who-image">
                                <Image
                                    src="/images/problem-solving.png"
                                    alt="Logic Image"
                                    width={350}
                                    height={350}
                                    quality={75}
                                    layout="responsive" // or other layout options
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Problem Solver</span> <br />
                                <span>— Loves Challenges</span>
                            </div>
                        </div>

                        <div className="position position-three">
                            <div className="who-image">
                                <Image
                                    src="/images/logic.png"
                                    alt="Logic Image"
                                    width={350}
                                    height={350}
                                    quality={75}
                                    layout="responsive" // or other layout options
                                />
                            </div>
                            <div className="card-font-style">
                                <span>Logical</span> <br />
                                <span>— Structural Mindset</span>
                            </div>
                        </div>

                        {/* <div className="position-two">
                            <Image
                                src="/images/problem-solving.png"
                                alt="Logic Image"
                                width={350}
                                height={350}
                                quality={75}
                                layout="responsive" // or other layout options
                            />
                            <div className="card-font-style">
                                Enjoy Problem Solving
                            </div>
                        </div> */}
                        {/* <div className="position-three">
                            <Image
                                src="/images/logic.png"
                                alt="Logic Image"
                                width={350}
                                height={350}
                                quality={75}
                                layout="responsive" // or other layout options
                            />
                            <div className="card-font-style">
                                Enjoy Logical Structural approach to solve prob
                            </div>
                        </div> */}
                    </div>
                    {/* <div>Who</div> */}
                </div>
            </div>
        </div>
    );
};

export default Who;
