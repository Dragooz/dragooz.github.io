import React, { useRef, useEffect, useState } from "react";
import { handleScroll } from "./Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDiagramProject,
    faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import CustomResponsiveImage from "./CustomResponsiveImage";

const What = ({ className = "" }: { className?: string }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const items = [
        {
            src: "/images/uu-logo-blackbg.png",
            alt: "AINari",
            title: "Next Generation Chatbot",
            period: "— 2023",
            position: "position-one",
            clickable: false,
            url: "",
        },
        {
            src: "/images/anothergpt-logo-black.png",
            alt: "AnotherGPT",
            title: "AnotherGPT",
            period: "— 2025",
            position: "position-two",
            clickable: true,
            url: "https://app.anothergpt.yichonggoh.com",
        },
        {
            src: "/images/mirra-logo-black.png",
            alt: "Mirra",
            title: "Mirra",
            period: "— 2026",
            position: "position-three",
            clickable: true,
            url: "https://app.mirra.yichonggoh.com",
        },
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        checkMobile();

        window.addEventListener("scroll", () =>
            handleScroll(
                "what",
                "what-top-side-line",
                "what-bottom-side-line",
                "what-bottom-side-line-content",
                1
            )
        );

        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("scroll", () =>
                handleScroll(
                    "what",
                    "what-top-side-line",
                    "what-bottom-side-line",
                    "what-bottom-side-line-content",
                    1
                )
            );
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const handleItemClick = (item: (typeof items)[0]) => {
        if (item.clickable && item.url) {
            window.open(item.url, "_blank");
        }
    };

    const getItemScale = (index: number) => {
        if (!items[index].clickable) return 1;
        if (hoveredIndex === null) return 1;
        if (hoveredIndex === index) return 1.1;
        return 0.95;
    };

    const getItemTransform = (index: number) => {
        const scale = getItemScale(index);

        // Define the translateY values for each position
        const translateYValues = {
            "position-one": "-12vh",
            "position-two": "8vh",
            "position-three": "0",
        };

        const position = items[index].position as keyof typeof translateYValues;
        const translateY = isMobile ? "0" : translateYValues[position];

        return `translateY(${translateY}) scale(${scale})`;
    };

    return (
        <div id="what" style={{ position: "relative", overflow: "hidden" }}>
            <div
                id="what-top-side-line"
                className={`top-side-line top-side-line-what`}
            />

            <div id="what-bottom-side-line-content">
                <div
                    id="what-bottom-side-line"
                    className={`bottom-side-line bottom-side-line-what`}
                />
                <div className="icon-wrapper">
                    <FontAwesomeIcon
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            width: "30px",
                            height: "30px",
                        }}
                        icon={faDiagramProject}
                    />
                </div>
                <div className={className}>
                    <div className="w-wrapper">
                        <div className="w-bottom-right">What</div>

                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`position ${item.position}`}
                                onClick={() => handleItemClick(item)}
                                onMouseEnter={() =>
                                    item.clickable && setHoveredIndex(index)
                                }
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    cursor: item.clickable
                                        ? "pointer"
                                        : "default",
                                    transform: getItemTransform(index),
                                    transition: "transform 0.3s ease",
                                    zIndex: hoveredIndex === index ? 10 : 1,
                                }}
                            >
                                <div
                                    className="border-clickable w-image border-clickable-what"
                                    style={
                                        item.title === "AnotherGPT"
                                            ? {
                                                  backgroundImage:
                                                      "radial-gradient(circle farthest-corner, rgb(255, 255, 255), rgba(255, 182, 193))",
                                              }
                                            : {}
                                    }
                                >
                                    <CustomResponsiveImage
                                        src={item.src}
                                        alt={item.alt}
                                        width={350}
                                        height={350}
                                    />
                                    {item.clickable && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                backgroundColor:
                                                    hoveredIndex === index
                                                        ? "rgb(34, 211, 238)"
                                                        : "rgba(34, 211, 238, 0.8)",
                                                borderRadius: "50%",
                                                padding: "10px",
                                                opacity:
                                                    hoveredIndex === index
                                                        ? 1
                                                        : 0.7,
                                                transform:
                                                    hoveredIndex === index
                                                        ? "scale(1.15)"
                                                        : "scale(1)",
                                                transition:
                                                    "all 0.3s ease",
                                                boxShadow:
                                                    hoveredIndex === index
                                                        ? "0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)"
                                                        : "0 0 10px rgba(34, 211, 238, 0.3)",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faExternalLinkAlt}
                                                style={{
                                                    color: "rgb(15, 23, 42)",
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="card-font-style">
                                    <span>{item.title}</span>
                                    <span>{item.period}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default What;
