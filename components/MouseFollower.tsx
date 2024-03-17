import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    faCode,
    faDragon,
    faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { transcode } from "buffer";
import React, {
    useState,
    useEffect,
    useRef,
    ReactComponentElement,
} from "react";

type HoverElementDictionary = {
    [key: string]: {
        keyframes: (
            x: number,
            y: number
        ) => {
            width: string;
            height: string;
            transform: string;
        };
        content: JSX.Element;
    };
};
const hoverElementDictionary: HoverElementDictionary = {
    "#code": {
        keyframes: (x: number, y: number) => ({
            width: "50px",
            height: "50px",
            transform: `translate(${x}px, ${y}px)`,
        }),
        content: (
            <FontAwesomeIcon
                icon={faCode}
                style={{ width: "30px", height: "30px" }}
            />
        ),
    },
    "#creativity": {
        keyframes: (x: number, y: number) => ({
            width: "50px",
            height: "50px",
            transform: `translate(${x}px, ${y}px)`,
        }),
        content: (
            <FontAwesomeIcon
                icon={faDragon}
                style={{ width: "30px", height: "30px" }}
            />
        ),
    },
    "#contactMe": {
        keyframes: (x: number, y: number) => ({
            width: "50px",
            height: "50px",
            transform: `translate(${x}px, ${y}px)`,
        }),
        content: (
            <>
                <FontAwesomeIcon
                    icon={faPerson}
                    style={{ width: "30px", height: "30px", color: "black" }}
                />

                <div style={{ position: "absolute", top: "50px" }}>
                    yichong99@gmail.com
                </div>
            </>
        ),
    },
    "div#umImage": {
        keyframes: (x: number, y: number) => ({
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            transform: `translate(${x}px, ${y}px)`,
        }),
        content: (
            <div>
                Hackathon Champion!
                <br />
                happy
            </div>
        ),
    },
    "#how": {
        keyframes: (x: number, y: number) => ({
            width: "50px",
            height: "50px",
            transform: `translate(${x}px, ${y}px)`,
        }),
        content: (
            <FontAwesomeIcon
                icon={faDragon}
                style={{ width: "30px", height: "30px" }}
            />
        ),
    },
};

const MouseFollower: React.FC = () => {
    const mouseFollowerRef = useRef<HTMLDivElement>(null);

    const [isInteracting, setIsInteracting] = useState(false);
    const [interactedElement, setInteractedElement] = useState<{
        keyframes: (
            x: number,
            y: number
        ) => {
            width: string;
            height: string;
            transform: string;
        };
        content: JSX.Element;
    } | null>(null);
    const handleInteraction = (x: number, y: number) => {
        if (mouseFollowerRef.current) {
            mouseFollowerRef.current.style.opacity = "1";
            x -= mouseFollowerRef.current.offsetWidth / 2;
            y -= mouseFollowerRef.current.offsetHeight / 2;

            // Check if the mouse/touch is over a target element
            const interactElement = document.elementFromPoint(x, y);
            console.log("interactElement: ", interactElement);

            let interactedElement = null; // Flag to track if a match is found

            for (let hoverElement of Object.keys(hoverElementDictionary)) {
                if (interactElement && interactElement.matches(hoverElement)) {
                    setIsInteracting(true);
                    setInteractedElement(hoverElementDictionary[hoverElement]);
                    interactedElement = hoverElementDictionary[hoverElement];
                    break; // Exit the loop once a match is found
                }
            }

            if (!interactedElement) {
                // If no match was found, set interacting to false and interacted element to an empty string
                setIsInteracting(false);
                setInteractedElement(null);
            }

            let keyframes = {
                width: "20px",
                height: "20px",
                transform: `translate(${x}px, ${y}px)`,
            };
            if (interactedElement != null) {
                keyframes = interactedElement.keyframes(x, y);
            }

            mouseFollowerRef.current.animate(keyframes, {
                duration: 800,
                fill: "forwards",
            });
        }
    };
    console.log("interactedElement: ", interactedElement);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            handleInteraction(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <>
            <div id="mouse-follower" ref={mouseFollowerRef}>
                {interactedElement && interactedElement.content
                    ? interactedElement.content
                    : null}
            </div>
            {/* Additional elements can be added here */}
        </>
    );
};
export default MouseFollower;
