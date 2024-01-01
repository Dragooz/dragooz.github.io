import React, { useRef, useEffect } from "react";

const SectionOne = () => {
    const divRef = useRef<HTMLHeadingElement>(null); // Using useRef to reference the h1 element.
    const intervalRef = useRef<number | null>(null); // Using useRef to keep track of the interval ID.

    const scramble = () => {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const targetWords = [
            {
                name: "Code",
                className: "highlight blue",
            },
            {
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
                    `<span class="${word.className}">${word.name}</span>`
                );
            });

            console.log("scrambledText: ", scrambledText);
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

    return (
        <>
            <div id="introduction">
                <div
                    id="section-one"
                    className={"introduction-content shine-text"}
                    data-value="Welcome to a place where Code dances with Creativity"
                    ref={divRef}
                >
                    Welcome to a place where Code dances with Creativity
                </div>
                <div className="bg-image animated-element" />
            </div>
        </>
    );
};

{
    /* Welcome to a place where{" "}
                    <span className="highlight blue">Code</span> dances with{" "}
                    <span className="highlight red">Creativity</span> */
}

export default SectionOne;
