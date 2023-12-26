import { transcode } from "buffer";
import React, { useState, useEffect, useRef } from "react";

const MouseFollower: React.FC = () => {
    const [scrollPercentage, setScrollPercentage] = useState<number>(0);
    const mouseFollowerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            if (mouseFollowerRef.current) {
                const x = e.clientX - mouseFollowerRef.current.offsetWidth / 2;
                const y = e.clientY - mouseFollowerRef.current.offsetHeight / 2;
                const keyframes = {
                    transform: `translate(${x}px, ${y}px)`,
                };

                mouseFollowerRef.current.animate(keyframes, { duration: 800 });
            }
        };

        // Scroll handler
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const newScrollValue = Math.min(scrollPosition / viewportHeight, 1);
            console.log("newScrollValue: ", newScrollValue);
            setScrollPercentage(newScrollValue);
            if (mouseFollowerRef.current) {
                mouseFollowerRef.current.style.opacity = `${newScrollValue}`;
            }
        };

        // Attach event listeners
        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        // Cleanup function
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const followerStyle: React.CSSProperties = {
        position: "fixed",
        pointerEvents: "none",
        width: "100px",
        height: "100px",
        // left: `${mouseClientX}px`,
        // top: `${mouseClientY}px`,
        backgroundColor: `rgba(128, 0, 128, ${scrollPercentage / 100})`,
        opacity: scrollPercentage > 0 ? 1 : 0,
        transition: "opacity 0.3s",
    };

    return (
        <>
            <div id="mouseFollower" ref={mouseFollowerRef} />
            {/* Additional elements can be added here with similar style but different positions or properties */}
        </>
    );
};

export default MouseFollower;
