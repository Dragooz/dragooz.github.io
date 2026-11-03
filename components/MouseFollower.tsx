import React, { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaPuzzlePiece } from "react-icons/fa";
import { SiDjango, SiDocker, SiPostgresql, SiPython, SiReact, SiTypescript } from "react-icons/si";

// A small ring follows the cursor and cycles through what I build with. Puzzle piece first: it is the point.
// Desktop with a fine pointer only; off under reduced motion; hidden over anything clickable.
const FOLLOWER_ICONS: IconType[] = [FaPuzzlePiece, SiPython, SiDjango, SiReact, SiTypescript, SiPostgresql, SiDocker];
const MOUSE_MOVES_PER_ICON = 40;
const FOLLOW_EASING = 0.18;

const MouseFollower: React.FC = () => {
    const ringRef = useRef<HTMLDivElement>(null);
    const [iconIndex, setIconIndex] = useState(0);

    useEffect(() => {
        const ring = ringRef.current;
        if (!ring) return;
        const finePointer = window.matchMedia("(pointer: fine)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!finePointer || reducedMotion) return;

        let moveCount = 0;
        let targetX = -100;
        let targetY = -100;
        let ringX = -100;
        let ringY = -100;
        let frameId = 0;

        const tick = (): void => {
            ringX += (targetX - ringX) * FOLLOW_EASING;
            ringY += (targetY - ringY) * FOLLOW_EASING;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            frameId = requestAnimationFrame(tick);
        };
        const onMouseMove = (event: MouseEvent): void => {
            targetX = event.clientX;
            targetY = event.clientY;
            const overClickable = (event.target as Element | null)?.closest("a, button") !== null;
            ring.style.opacity = overClickable ? "0" : "1";
            moveCount += 1;
            if (moveCount >= MOUSE_MOVES_PER_ICON) {
                moveCount = 0;
                setIconIndex((index) => (index + 1) % FOLLOWER_ICONS.length);
            }
        };
        const onMouseLeave = (): void => {
            ring.style.opacity = "0";
        };

        document.addEventListener("mousemove", onMouseMove);
        document.documentElement.addEventListener("mouseleave", onMouseLeave);
        frameId = requestAnimationFrame(tick);
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.documentElement.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(frameId);
        };
    }, []);

    const Icon = FOLLOWER_ICONS[iconIndex];
    return (
        <div ref={ringRef} className="mouse-follower" aria-hidden="true">
            <Icon />
        </div>
    );
};

export default MouseFollower;
