import React from "react";

const Navbar: React.FC = () => {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-list content-margin">
                <li onClick={() => scrollToSection("who-section")}>Who</li>
                <li onClick={() => scrollToSection("when-section")}>When</li>
                <li onClick={() => scrollToSection("where-section")}>Where</li>
                <li onClick={() => scrollToSection("what-section")}>What</li>
                <li onClick={() => scrollToSection("why-section")}>Why</li>
                <li onClick={() => scrollToSection("how-section")}>How</li>
            </div>
            <div>my button</div>
        </nav>
    );
};

export default Navbar;
