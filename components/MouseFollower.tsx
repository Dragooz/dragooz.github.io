import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faDragon } from "@fortawesome/free-solid-svg-icons";
import { transcode } from "buffer";
import React, { useState, useEffect, useRef } from "react";
const MouseFollower: React.FC = () => {
    const mouseFollowerRef = useRef<HTMLDivElement>(null);

    const [isHoveringCode, setIsHoveringCode] = useState(false);
    const [isHoveringCreativity, setIsHoveringCreativity] = useState(false);

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
                const isHoveringCode =
                    (hoverElement && hoverElement.matches("#code")) || false;
                setIsHoveringCode(isHoveringCode);

                const isHoveringCreativity =
                    (hoverElement && hoverElement.matches("#creativity")) ||
                    false;
                setIsHoveringCreativity(isHoveringCreativity);

                let oriWidth = "20px";
                let oriHeight = "20px";

                if (isHoveringCode || isHoveringCreativity) {
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
                {isHoveringCode ? (
                    <FontAwesomeIcon
                        icon={faCode}
                        style={{ width: "30px", height: "30px" }}
                    />
                ) : isHoveringCreativity ? (
                    <FontAwesomeIcon
                        icon={faDragon}
                        style={{ width: "30px", height: "30px" }}
                    />
                ) : null}
            </div>
            {/* Additional elements can be added here */}
        </>
    );
};

export default MouseFollower;
