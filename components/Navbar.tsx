import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useBetterMediaQuery } from "../pages";
import MenuDrawer from "./MenuDrawer";
import type { NodeId } from "./SolarSystem";

export const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
};

const NAV_ITEMS: { label: string; nodeId: NodeId }[] = [
    { label: "Work",    nodeId: "what" },
    { label: "Me",      nodeId: "who" },
    { label: "Journey", nodeId: "when" },
    { label: "Drive",   nodeId: "why" },
    { label: "Process", nodeId: "how" },
];

interface NavbarProps {
    activeNode: NodeId | null;
    setActiveNode: (node: NodeId | null) => void;
    openContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeNode, setActiveNode, openContact }) => {
    const isMobile = useBetterMediaQuery("(max-width: 767px)");
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuDrawer = () => setIsOpen(!isOpen);

    const handleNavClick = (nodeId: NodeId) => {
        setActiveNode(nodeId);
        scrollToSection("solar-system");
    };

    return (
        <>
            {isMobile ? (
                <MenuDrawer isOpen={isOpen} setIsOpen={setIsOpen} setActiveNode={setActiveNode} />
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
                        {NAV_ITEMS.map(item => (
                            <li
                                key={item.nodeId}
                                className={activeNode === item.nodeId ? "nav-active" : ""}
                                onClick={() => handleNavClick(item.nodeId)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </div>
                )}
                <div
                    className="button"
                    style={{ cursor: "pointer", padding: "16px 32px" }}
                    onClick={openContact}
                >
                    Get In Touch
                </div>
            </div>
        </>
    );
};

export default Navbar;
