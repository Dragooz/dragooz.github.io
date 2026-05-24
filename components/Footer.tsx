import React from "react";

const Footer: React.FC<{ openContact?: () => void }> = ({ openContact }) => {
    return (
        <footer className="site-footer">
            <div className="footer-cta">
                <h3 className="footer-heading">
                    Wasting hours on repetitive work?
                </h3>
                <button
                    className="footer-cta-button"
                    onClick={openContact}
                >
                    Get In Touch
                </button>
            </div>
            <div className="footer-links">
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
