import React from "react";
import Link from "next/link";
import TalkButton from "./TalkButton";

const Navbar: React.FC = () => (
    <nav className="navbar">
        <Link href="/" className="navbar-logo" aria-label="Home" />
        <TalkButton className="talk-button-small" />
    </nav>
);

export default Navbar;
