import { transcode } from "buffer";
import React, { useState, useEffect, useRef } from "react";

const MouseFollower: React.FC = () => {
    const mouseFollowerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            if (mouseFollowerRef.current) {
                mouseFollowerRef.current.style.opacity = "1";
                const x = e.clientX - mouseFollowerRef.current.offsetWidth / 2;
                const y = e.clientY - mouseFollowerRef.current.offsetHeight / 2;
                const keyframes = {
                    transform: `translate(${x}px, ${y}px)`,
                };
                mouseFollowerRef.current.animate(keyframes, {
                    duration: 800,
                    fill: "forwards",
                });
            }
        };

        // Attach event listeners
        document.addEventListener("mousemove", handleMouseMove);

        // Cleanup function
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <div id="mouseFollower" ref={mouseFollowerRef} />
            {/* Additional elements can be added here with similar style but different positions or properties */}
        </>
    );
};

export default MouseFollower;
