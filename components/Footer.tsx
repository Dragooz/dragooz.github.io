import React from "react";
import Link from "next/link";
import TalkButton from "./TalkButton";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

const Footer: React.FC = () => (
    <footer className="footer">
        <div className="footer-cta">
            <h2 className="section-title">
                Got a problem worth fixing?
            </h2>
            <p className="tail-muted">One message. I reply within a business day.</p>
            <TalkButton />
        </div>
        <div className="footer-bar">
            <div className="footer-brand">
                <Link href="/" className="navbar-logo" aria-label="Home" />
                <span>Yi Chong · Engineer for business owners</span>
            </div>
            <nav className="footer-nav" aria-label="Footer">
                <a href="https://medium.com/@ycgoh99" target="_blank" rel="noopener noreferrer">Writing</a>
                <a href="https://github.com/Dragooz" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/yi-chong-yc-9803901a4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </nav>
            <div className="footer-meta">
                <span>Built by hand. No templates.</span>
                <span>© {new Date().getFullYear()} Yi Chong</span>
            </div>
        </div>
    </footer>
);

export default Footer;
