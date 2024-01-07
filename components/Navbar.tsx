import Image from "next/image";
import React from "react";

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
                <li className="logo" />
                <li onClick={() => scrollToSection("who")}>Who</li>
                <li onClick={() => scrollToSection("when")}>When</li>
                <li onClick={() => scrollToSection("where")}>Where</li>
                <li onClick={() => scrollToSection("what")}>What</li>
                <li onClick={() => scrollToSection("why")}>Why</li>
                <li onClick={() => scrollToSection("how")}>How</li>
            </div>
            <div className="button content-margin">Contact Me!</div>
        </nav>
    );
};

export default Navbar;
