import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import TalkButton from "./TalkButton";

// Who I am at first glance: name and role next to the logo, profiles one tap away.
const Navbar: React.FC = () => (
    <nav className="navbar">
        <Link href="/" className="navbar-brand" aria-label="Home">
            <span className="navbar-logo" />
            <span className="navbar-name">
                Yi Chong
                <span className="navbar-role">Engineer for business owners</span>
            </span>
        </Link>
        <div className="navbar-actions">
            <Link href="/blog" className="navbar-link">Writing</Link>
            <a
                href="https://www.linkedin.com/in/yi-chong-yc-9803901a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-icon"
                aria-label="LinkedIn"
            >
                <FaLinkedin aria-hidden="true" />
            </a>
            <a
                href="https://github.com/Dragooz"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-icon"
                aria-label="GitHub"
            >
                <FaGithub aria-hidden="true" />
            </a>
            <TalkButton label="WhatsApp me" className="talk-button-small" />
        </div>
    </nav>
);

export default Navbar;
