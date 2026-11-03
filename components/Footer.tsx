import React from "react";
import Link from "next/link";
import TalkButton from "./TalkButton";

const Footer: React.FC = () => (
    <footer className="footer">
        <div className="cta-row">
            <h2 className="section-title">
                Got a problem <span className="accent">worth fixing?</span>
            </h2>
            <TalkButton />
        </div>
        <div className="footer-links">
            <Link href="/blog">Writing</Link>
            <a href="https://github.com/Dragooz" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/yi-chong-yc-9803901a4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="footer-tagline">Built by hand. No templates.</span>
        </div>
    </footer>
);

export default Footer;
