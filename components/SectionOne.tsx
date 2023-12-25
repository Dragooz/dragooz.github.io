import Image from "next/image";
import React, { useEffect, useState } from "react";

const SectionOne = () => {
    return (
        <>
            <MouseFollower />
            <div id="introduction">
                <div>
                    Welcome to a place where{" "}
                    <span className="highlight blue">Code</span> dances with{" "}
                    <span className="highlight red">Creativity</span>
                </div>
                <div className="bgImage" />
            </div>
        </>
    );
};

const MouseFollower: React.FC = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [mouseClientX, setMouseClientX] = useState(0);
    const [mouseClientY, setMouseClientY] = useState(0);

    useEffect(() => {
        // Create the follower div and append it to the body
        const follower = document.createElement("div");
        follower.id = "mouse-follower";
        follower.style.position = "fixed";
        follower.style.pointerEvents = "none";
        follower.style.width = "100px";
        follower.style.height = "100px";
        follower.style.left = `${mouseClientX}px`;
        follower.style.top = `${mouseClientY}px`;
        follower.style.backgroundColor = `rgba(128, 0, 128, ${
            scrollPercentage / 100
        })`;
        document.body.appendChild(follower);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            setMouseClientX(e.clientX);
            setMouseClientY(e.clientY);
            follower.style.backgroundColor = `rgba(128, 0, 128, ${
                scrollPercentage / 100
            })`;
        };

        // Scroll handler
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const newScrollPercentage = Math.min(
                (scrollPosition / viewportHeight) * 100,
                100
            );
            setScrollPercentage(newScrollPercentage);
        };

        // Attach event listeners
        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        // Cleanup function
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            document.body.removeChild(follower);
        };
    }, [mouseClientX, mouseClientY, scrollPercentage]); // Dependency on scrollPercentage

    return null; // This component does not render anything itself
};

export default SectionOne;
