import React from "react";
import Link from "next/link";
import TalkButton from "./TalkButton";

const Navbar: React.FC = () => (
    <nav className="navbar">
        <Link href="/" className="navbar-logo" aria-label="Home" />
        <div className="navbar-actions">
            <Link href="/blog" className="navbar-link">Writing</Link>
            <TalkButton label="WhatsApp me" className="talk-button-small" />
        </div>
    </nav>
);

export default Navbar;
