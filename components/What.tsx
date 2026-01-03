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
            src: "/images/ainari-logo-square-blackbg.png",
            alt: "AINari",
            title: "Agriculture Map System",
            period: "— 2022",
            position: "position-one",
            clickable: false,
            url: "",
        },
        {
            src: "/images/uu-logo-blackbg.png",
            alt: "AINari",
            title: "Next Generation Chatbot",
            period: "— 2023",
            position: "position-two",
            clickable: false,
            url: "",
        },
        {
            src: "/images/anothergpt-logo-black.png",
            alt: "AnotherGPT",
            title: "AnotherGPT",
            period: "— 2025",
            position: "position-three",
            clickable: true,
            url: "https://app.anothergpt.yichonggoh.com",
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
        <div id="what" style={{ position: "relative" }}>
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
                                                    "rgba(0, 0, 0, 0.7)",
                                                borderRadius: "50%",
                                                padding: "8px",
                                                opacity:
                                                    hoveredIndex === index
                                                        ? 1
                                                        : 0.6,
                                                transition: "opacity 0.3s ease",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faExternalLinkAlt}
                                                style={{
                                                    color: "white",
                                                    width: "12px",
                                                    height: "12px",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="card-font-style">
                                    <span>{item.title}</span>
                                    <br />
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
