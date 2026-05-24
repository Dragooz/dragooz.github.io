import React from "react";
import { scrollToSection } from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import type { NodeId } from "./SolarSystem";

const MENU_ITEMS: { label: string; nodeId: NodeId }[] = [
    { label: "Work",    nodeId: "what" },
    { label: "Me",      nodeId: "who" },
    { label: "Journey", nodeId: "when" },
    { label: "Drive",   nodeId: "why" },
    { label: "Process", nodeId: "how" },
];

const MenuDrawer = ({
    isOpen,
    setIsOpen,
    setActiveNode,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveNode: (node: NodeId | null) => void;
}) => {
    const handleItemClick = (nodeId: NodeId) => {
        setActiveNode(nodeId);
        scrollToSection("solar-system");
        setIsOpen(false);
    };

    return (
        <div>
            {isOpen ? (
                <FontAwesomeIcon
                    style={{
                        position: "absolute",
                        right: "30px",
                        zIndex: 999,
                        width: "30px",
                        height: "30px",
                    }}
                    icon={faCircleXmark}
                    onClick={() => setIsOpen(false)}
                />
            ) : null}

            <div
                className={`drawer ${isOpen ? "open" : ""} `}
                style={{ padding: "16px 32px" }}
            >
                {MENU_ITEMS.map(item => (
                    <li key={item.nodeId} onClick={() => handleItemClick(item.nodeId)}>
                        {item.label}
                    </li>
                ))}
            </div>
            {isOpen && (
                <div
                    className="backdrop"
                    onClick={() => {
                        setIsOpen(false);
                    }}
                ></div>
            )}
        </div>
    );
};

export default MenuDrawer;
