import React from "react";
import Link from "next/link";
import TalkButton from "./TalkButton";
import EmailReveal from "./EmailReveal";
import { WHATSAPP_CHAT_URL, WHATSAPP_FORWARD_URL } from "./whatsappLink";

const Footer: React.FC = () => (
    <footer className="footer">
        <div className="footer-cta">
            <h2 className="section-title">
                Tell me what your team does by hand.
            </h2>
            <p className="tail-muted">Send 1 message. I reply the same business day.</p>
            <p className="tail-muted">
                Not the owner?{" "}
                <a href={WHATSAPP_FORWARD_URL} target="_blank" rel="noopener noreferrer" className="footer-forward">
                    Send this page to your boss on WhatsApp.
                </a>{" "}
                I will explain it to them.
            </p>
            <TalkButton />
        </div>
        <div className="footer-bar">
            <div className="footer-brand">
                <Link href="/" className="navbar-logo" aria-label="Home" />
                <span>Yi Chong · Engineer for business owners</span>
            </div>
            <nav className="footer-nav" aria-label="Footer">
                <Link href="/blog">Writing</Link>
                <a href="https://github.com/Dragooz" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/yi-chong-yc-9803901a4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <EmailReveal />
            </nav>
            <div className="footer-meta">
                <span>© {new Date().getFullYear()} Yi Chong</span>
            </div>
        </div>
    </footer>
);

export default Footer;
