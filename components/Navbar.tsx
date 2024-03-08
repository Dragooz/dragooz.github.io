import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useBetterMediaQuery } from "../pages";
import MenuDrawer from "./MenuDrawer";

export const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
};

const Navbar: React.FC = () => {
    const isMobile = useBetterMediaQuery("(max-width: 767px)");
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuDrawer = () => setIsOpen(!isOpen);
    return (
        <>
            {isMobile ? (
                <MenuDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
                <> </>
            )}
            <div className={`navbar ${isMobile ? "nav-reverse" : ""}`}>
                {isMobile ? (
                    <div
                        style={{ height: 30, width: 30, padding: "16px 32px" }}
                        onClick={toggleMenuDrawer}
                    >
                        <FontAwesomeIcon
                            style={{
                                position: "absolute",
                                zIndex: 2,
                                width: "30px",
                                height: "30px",
                            }}
                            icon={faBars}
                        />
                    </div>
                ) : (
                    <div
                        className={`nav-list`}
                        style={{ padding: "16px 32px" }}
                    >
                        <li
                            onClick={() => scrollToSection("introduction")}
                            className="logo"
                        />
                        <li onClick={() => scrollToSection("who")}>Who</li>
                        <li onClick={() => scrollToSection("when")}>
                            When & Where
                        </li>
                        {/* <li onClick={() => scrollToSection("where")}></li> */}
                        <li onClick={() => scrollToSection("what")}>What</li>
                        <li onClick={() => scrollToSection("why")}>Why</li>
                        <li onClick={() => scrollToSection("how")}>How</li>
                    </div>
                )}
                <div
                    id="contactMe"
                    className="button"
                    style={{ cursor: "pointer", padding: "16px 32px" }}
                >
                    <a
                        id="contactMe"
                        target="_blank"
                        href="https://www.linkedin.com/in/yi-chong-yc-9803901a4/"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        Contact Me!
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
