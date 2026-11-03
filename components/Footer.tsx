import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

const Footer: React.FC<{ openContact?: () => void }> = ({ openContact }) => {
    return (
        <footer className="site-footer">
            <div className="footer-cta">
                <h3 className="footer-heading">
                    Got a problem worth fixing?
                </h3>
                <a
                    className="footer-cta-button"
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaWhatsapp aria-hidden="true" />
                    WhatsApp me
                </a>
                <button className="footer-form-link" onClick={openContact}>
                    or send a message instead
                </button>
            </div>
            <div className="footer-links">
                <Link href="/blog">Writing</Link>
                <a
                    href="https://github.com/Dragooz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/yi-chong-yc-9803901a4/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>
            </div>
            <div className="footer-tagline">Built by hand. No templates.</div>
        </footer>
    );
};

export default Footer;
