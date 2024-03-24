import React, { useState } from "react";
import { scrollToSection } from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const MenuDrawer = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
                <li
                    onClick={() => {
                        scrollToSection("who");
                        setIsOpen(false);
                    }}
                >
                    Who
                </li>
                <li
                    onClick={() => {
                        scrollToSection("when");
                        setIsOpen(false);
                    }}
                >
                    When & Where
                </li>
                {/* <li onClick={() => scrollToSection("where")}>Where</li> */}
                <li
                    onClick={() => {
                        scrollToSection("what");
                        setIsOpen(false);
                    }}
                >
                    What
                </li>
                <li
                    onClick={() => {
                        scrollToSection("why");
                        setIsOpen(false);
                    }}
                >
                    Why
                </li>
                <li
                    onClick={() => {
                        scrollToSection("how");
                        setIsOpen(false);
                    }}
                >
                    How
                </li>
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
