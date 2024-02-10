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

interface HoverElementDictionary {
    [key: string]: any; // This line adds the index signature
}

const hoverElementDictionary: HoverElementDictionary = {
    "#code": (
        <FontAwesomeIcon
            icon={faCode}
            style={{ width: "30px", height: "30px" }}
        />
    ),
    "#creativity": (
        <FontAwesomeIcon
            icon={faDragon}
            style={{ width: "30px", height: "30px" }}
        />
    ),
    "#contactMe": (
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
};

const hoverCriteria = ["#code", "#creativity", "#contactMe"];

const MouseFollower: React.FC = () => {
    const mouseFollowerRef = useRef<HTMLDivElement>(null);

    const [isHovering, setIsHovering] = useState(false);
    const [hoveredElementText, setHoveredElement] = useState<string>("");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (mouseFollowerRef.current) {
                mouseFollowerRef.current.style.opacity = "1";
                const x = e.clientX - mouseFollowerRef.current.offsetWidth / 2;
                const y = e.clientY - mouseFollowerRef.current.offsetHeight / 2;

                // Check if the mouse is over a target element
                const hoverElement = document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );

                let matchFound = false; // Flag to track if a match is found

                for (let criteria of hoverCriteria) {
                    if (hoverElement && hoverElement.matches(criteria)) {
                        setIsHovering(true);
                        setHoveredElement(criteria);
                        matchFound = true;
                        break; // Exit the loop once a match is found
                    }
                }

                if (!matchFound) {
                    // If no match was found, set hovering to false and hovered element to an empty string
                    setIsHovering(false);
                    setHoveredElement("");
                }

                let oriWidth = "20px";
                let oriHeight = "20px";

                if (matchFound) {
                    oriWidth = "50px";
                    oriHeight = "50px";
                }

                const keyframes = {
                    width: oriWidth,
                    height: oriHeight,
                    transform: `translate(${x}px, ${y}px)`,
                };
                mouseFollowerRef.current.animate(keyframes, {
                    duration: 800,
                    fill: "forwards",
                });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <div id="mouse-follower" ref={mouseFollowerRef}>
                {hoveredElementText
                    ? hoverElementDictionary[hoveredElementText]
                    : null}
            </div>
            {/* Additional elements can be added here */}
        </>
    );
};

export default MouseFollower;
