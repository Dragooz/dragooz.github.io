import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, useState } from "react";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";

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
                const bottomSection = document.getElementById(
                    "who-bottom-side-line-content"
                );
                if (bottomSection) {
                    const bottomSectionHeight = bottomSection.offsetHeight;
                    const bottomScrollPosition = window.scrollY;

                    // console.log("bottomSectionHeight: ", bottomSectionHeight);
                    // console.log("bottomScrollPosition: ", bottomScrollPosition);
                    // console.log(bottomScrollPosition > bottomSectionHeight / 1.25);
                    if (clipPercent == 100) {
                        // Adjust the clip-path style to reveal a portion of the section
                        bottomSection.style.clipPath = `inset(0 0 0 0)`;
                        bottomSection.style.opacity = "1";
                    } else {
                        // Reset the clip-path to hide the section
                        bottomSection.style.opacity = "0";
                        bottomSection.style.clipPath = "inset(0 0 100% 0)";
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
                <div id="who-bottom-side-line" className={`bottom-side-line`}>
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
                </div>

                <div className={className}>
                    <div style={{ marginLeft: "40px" }}>
                        <div>
                            Information Technolgies, Artificial Intelligence,
                            University Malaya 2023 Graduate
                        </div>
                        <div>Enjoy Problem Solving</div>
                        <div>
                            Enjoy Logical Structural approach to solve prob
                        </div>
                    </div>
                    {/* <div>Who</div> */}
                </div>
            </div>
        </div>
    );
};

export default Who;
