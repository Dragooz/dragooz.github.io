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
import {
    SiDjango,
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiPython,
    SiKubernetes,
    SiDocker,
    SiPostgresql,
} from "react-icons/si";

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
                    byichonggoh@gmail.com
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

// Tech stack icons configuration
const techStackIcons = [
    { icon: SiDjango, color: "#092E20", name: "Django" },
    { icon: SiReact, color: "#61DAFB", name: "React" },
    { icon: SiNextdotjs, color: "#000000", name: "Next.js" },
    { icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
    { icon: SiPython, color: "#3776AB", name: "Python" },
    { icon: SiKubernetes, color: "#326CE5", name: "Kubernetes" },
    { icon: SiDocker, color: "#2496ED", name: "Docker" },
    { icon: SiPostgresql, color: "#4169E1", name: "PostgreSQL" },
];

const MouseFollower: React.FC = () => {
    const mouseFollowerRef = useRef<HTMLDivElement>(null);
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const moveCountRef = useRef(0);
    const iconChangeThreshold = 30; // Change icon every 30 mouse moves

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

            // Increment move counter and change icon periodically
            moveCountRef.current += 1;
            if (moveCountRef.current >= iconChangeThreshold) {
                setCurrentIconIndex((prevIndex) => (prevIndex + 1) % techStackIcons.length);
                moveCountRef.current = 0;
            }

            x -= mouseFollowerRef.current.offsetWidth / 2;
            y -= mouseFollowerRef.current.offsetHeight / 2;

            // Check if the mouse/touch is over a target element
            const interactElement = document.elementFromPoint(x, y);
            // console.log("interactElement: ", interactElement);

            let interactedElement = null; // Flag to track if a match is found

            // Check if hovering over clickable elements (buttons, links, etc.)
            const isClickable = interactElement && (
                interactElement.tagName === 'A' ||
                interactElement.tagName === 'BUTTON' ||
                interactElement.closest('a') ||
                interactElement.closest('button') ||
                interactElement.classList.contains('clickable') ||
                interactElement.classList.contains('border-clickable') ||
                (window.getComputedStyle(interactElement).cursor === 'pointer')
            );

            if (isClickable) {
                // Hide the entire cursor follower for clickable elements
                mouseFollowerRef.current.style.opacity = "0";
                setIsInteracting(true);
                setInteractedElement(null);
            } else {
                mouseFollowerRef.current.style.opacity = "1";
                for (let hoverElement of Object.keys(hoverElementDictionary)) {
                    if (interactElement && interactElement.matches(hoverElement)) {
                        setIsInteracting(true);
                        setInteractedElement(hoverElementDictionary[hoverElement]);
                        interactedElement = hoverElementDictionary[hoverElement];
                        break; // Exit the loop once a match is found
                    }
                }

                if (!interactedElement && !isClickable) {
                    // If no match was found, set interacting to false and interacted element to an empty string
                    setIsInteracting(false);
                    setInteractedElement(null);
                }
            }

            let keyframes = {
                width: "40px",
                height: "40px",
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
    // console.log("interactedElement: ", interactedElement);
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

    const currentTech = techStackIcons[currentIconIndex];
    const TechIcon = currentTech.icon;

    return (
        <>
            <div id="mouse-follower" ref={mouseFollowerRef}>
                {interactedElement && interactedElement.content ? (
                    interactedElement.content
                ) : !isInteracting ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <TechIcon
                            style={{
                                width: "24px",
                                height: "24px",
                                color: currentTech.color,
                                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
                            }}
                        />
                    </div>
                ) : null}
            </div>
            {/* Additional elements can be added here */}
        </>
    );
};
export default MouseFollower;
