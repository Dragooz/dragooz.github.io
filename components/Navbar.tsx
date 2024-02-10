import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
    };

    return (
        <nav className="navbar ">
            <div className="nav-list content-margin">
                <li
                    onClick={() => scrollToSection("introduction")}
                    className="logo"
                />
                <li onClick={() => scrollToSection("who")}>Who</li>
                <li onClick={() => scrollToSection("when")}>When & Where</li>
                {/* <li onClick={() => scrollToSection("where")}></li> */}
                <li onClick={() => scrollToSection("what")}>What</li>
                <li onClick={() => scrollToSection("why")}>Why</li>
                <li onClick={() => scrollToSection("how")}>How</li>
            </div>

            <div
                id="contactMe"
                className="button content-margin"
                style={{ cursor: "pointer" }}
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
        </nav>
    );
};

export default Navbar;
