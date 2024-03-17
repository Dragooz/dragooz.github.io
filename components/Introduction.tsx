import React, { useRef, useEffect } from "react";
export const handleScroll = (
    topElementWrapperId: string,
    topElementId: string,
    bottomElementId: string,
    bottomElementContentId: string,
    multiplier: number
) => {
    const topSectionWrapper = document.getElementById(topElementWrapperId);
    const topSection = document.getElementById(topElementId);

    if (topSection && topSectionWrapper) {
        // console.log("topSectionWrapper: ", topSectionWrapper.scrollHeight);
        const topSectionWrapperHeight =
            topSectionWrapper.clientHeight * multiplier;
        const topScrollPosition = window.scrollY;

        // console.log(">>>>>>>>>", topElementId);
        // console.log("topSectionWrapperHeight: ", topSectionWrapperHeight);
        // console.log("topScrollPosition: ", topScrollPosition);
        // console.log(
        //     "topScrollPosition > topSectionWrapperHeight / 2: ",
        //     topScrollPosition > topSectionWrapperHeight / 2
        // );

        let clipPercent = Math.min(
            (topScrollPosition / topSectionWrapperHeight) * 165,
            100
        );
        if (topScrollPosition > topSectionWrapperHeight / 3) {
            // Adjust the clip-path style to reveal a portion of the section
            topSection.style.clipPath = `inset(0 0 ${100 - clipPercent}% 0)`;
        } else {
            // Reset the clip-path to hide the section
            topSection.style.clipPath = "inset(0 0 100% 0)";
        }

        // console.log("clipPercent: ", clipPercent);
        const bottomSectionLine = document.getElementById(bottomElementId);
        if (bottomSectionLine) {
            if (clipPercent == 100) {
                // Adjust the clip-path style to reveal a portion of the section
                bottomSectionLine.style.clipPath = `inset(0 0 0 0)`;
            } else {
                // Reset the clip-path to hide the section
                bottomSectionLine.style.clipPath = "inset(0 0 100% 0)";
            }
        }

        const bottomSection = document.getElementById(bottomElementContentId);
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

const Introduction = ({ className = "" }: { className?: string }) => {
    const divRef = useRef<HTMLHeadingElement>(null); // Using useRef to reference the h1 element.
    const intervalRef = useRef<number | null>(null); // Using useRef to keep track of the interval ID.

    const scramble = () => {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const targetWords = [
            {
                id: "code",
                name: "Code",
                className: "highlight blue",
            },
            {
                id: "creativity",
                name: "Creativity",
                className: "highlight red",
            },
        ];
        let iteration = 0;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = window.setInterval(() => {
            if (!divRef.current) return;
            divRef.current.style.opacity = "1";
            let scrambledText = divRef.current.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return divRef.current!.getAttribute("data-value")![
                            index
                        ];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            targetWords.forEach((word) => {
                const regex = new RegExp(`\\b${word.name}\\b`, "g");
                scrambledText = scrambledText.replace(
                    regex,
                    `<span id=${word.id} class="${word.className}">${word.name}</span>`
                );
            });

            divRef.current.innerHTML = scrambledText;

            if (
                iteration >=
                (divRef.current.getAttribute("data-value")?.length ?? 0)
            ) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 2;
        }, 30);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            scramble();
        }, 100); // 1000 milliseconds = 1 second

        // Cleanup the interval on component unmount
        return () => {
            clearTimeout(timer);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src =
    //         "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    //     script.type = "module";
    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    const third_description = "Passionate with Code & Creativity!";
    return (
        <div id="introduction" className={className}>
            <div className={"introduction-content"}>
                <div className="meet-him shine-text-one">Meet Yi Chong!</div>
                <span className="description shine-text-two">
                    —— Full Stack Developer with Expertise in AI
                </span>
            </div>

            {/* <div id="section-one" data-value={third_description} ref={divRef}>
                {third_description}
            </div> */}
        </div>
    );
};

{
    /* Welcome to a place where{" "}
                    <span className="highlight blue">Code</span> dances with{" "}
                    <span className="highlight red">Creativity</span> */
}

export default Introduction;
