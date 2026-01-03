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

// Helper function to convert hex to HSL
const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
        s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }
    return [h * 360, s * 100, l * 100];
};

// Helper function to convert HSL to hex
const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

// Get complementary color (180 degree hue rotation)
const getComplementaryColor = (hex: string): string => {
    // Handle black/very dark colors - use a soft warm complement
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (r + g + b < 50) {
        return "#8B7355"; // Warm brown for black icons
    }

    const [h, s, l] = hexToHsl(hex);
    const complementH = (h + 180) % 360;
    // Soften the complement by reducing saturation slightly and adjusting lightness
    const complementS = Math.min(s * 0.7, 70);
    const complementL = Math.max(Math.min(l, 60), 40);
    return hslToHex(complementH, complementS, complementL);
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
                setCurrentIconIndex(
                    (prevIndex) => (prevIndex + 1) % techStackIcons.length
                );
                moveCountRef.current = 0;
            }

            x -= mouseFollowerRef.current.offsetWidth / 2;
            y -= mouseFollowerRef.current.offsetHeight / 2;

            // Check if the mouse/touch is over a target element
            const interactElement = document.elementFromPoint(x, y);
            // console.log("interactElement: ", interactElement);

            let interactedElement = null; // Flag to track if a match is found

            // Check if hovering over clickable elements (buttons, links, etc.)
            const isClickable =
                interactElement &&
                (interactElement.tagName === "A" ||
                    interactElement.tagName === "BUTTON" ||
                    interactElement.closest("a") ||
                    interactElement.closest("button") ||
                    interactElement.classList.contains("clickable") ||
                    interactElement.classList.contains("border-clickable") ||
                    window.getComputedStyle(interactElement).cursor ===
                        "pointer");

            if (isClickable) {
                // Hide the entire cursor follower for clickable elements
                mouseFollowerRef.current.style.opacity = "0";
                setIsInteracting(true);
                setInteractedElement(null);
            } else {
                mouseFollowerRef.current.style.opacity = "1";
                for (let hoverElement of Object.keys(hoverElementDictionary)) {
                    if (
                        interactElement &&
                        interactElement.matches(hoverElement)
                    ) {
                        setIsInteracting(true);
                        setInteractedElement(
                            hoverElementDictionary[hoverElement]
                        );
                        interactedElement =
                            hoverElementDictionary[hoverElement];
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
    const complementColor = getComplementaryColor(currentTech.color);

    // Check if the icon color is too dark and use a lighter alternative
    const getVisibleIconColor = (color: string): string => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const brightness = r + g + b;

        // If color is too dark (nearly black), use a lighter version
        if (brightness < 100) {
            // For very dark colors, use white or a bright complementary color
            if (color === "#000000") {
                return "#FFFFFF"; // Pure white for Next.js
            }
            // For other dark colors, brighten them significantly
            const [h, s, l] = hexToHsl(color);
            return hslToHex(h, Math.max(s, 70), Math.max(l, 60));
        }
        return color;
    };

    const visibleIconColor = getVisibleIconColor(currentTech.color);

    return (
        <>
            <div id="mouse-follower" ref={mouseFollowerRef}>
                {interactedElement && interactedElement.content ? (
                    interactedElement.content
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {/* Dark background for high contrast */}
                        <div
                            style={{
                                position: "absolute",
                                width: "82%",
                                height: "82%",
                                borderRadius: "50%",
                                background: "rgba(8, 12, 21, 0.92)",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                            }}
                        />

                        {/* Subtle complementary color glow ring */}
                        <div
                            style={{
                                position: "absolute",
                                width: "90%",
                                height: "90%",
                                borderRadius: "50%",
                                background: "transparent",
                                boxShadow: `0 0 8px 1px ${complementColor}20, inset 0 0 4px 1px ${complementColor}15`,
                                animation: "pulse 3s ease-in-out infinite",
                            }}
                        />

                        {/* Icon with original color + subtle complementary glow */}
                        <TechIcon
                            style={{
                                width: "28px",
                                height: "28px",
                                color: visibleIconColor,
                                filter: `
                                    drop-shadow(0 0 3px ${complementColor}35)
                                    drop-shadow(0 0 1px ${visibleIconColor}60)
                                    brightness(1.15)
                                    contrast(1.5)
                                    saturate(1.1)
                                `,
                                position: "relative",
                                zIndex: 1,
                                transition: "all 0.4s ease",
                            }}
                        />

                        {/* Tech name label */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "-22px",
                                fontSize: "9px",
                                fontWeight: "500",
                                color: visibleIconColor,
                                textShadow: `0 0 2px ${complementColor}30, 0 1px 3px rgba(0, 0, 0, 0.9)`,
                                whiteSpace: "nowrap",
                                opacity: 0.85,
                                letterSpacing: "0.8px",
                                filter: "contrast(1.4)",
                                textTransform: "uppercase",
                            }}
                        >
                            {currentTech.name}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%,
                    100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.03);
                        opacity: 0.35;
                    }
                }
            `}</style>
        </>
    );
};
export default MouseFollower;
