import React from "react";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

// The one action on the site. Every call to action opens the same WhatsApp chat.
const TalkButton: React.FC<{ label?: string; className?: string }> = ({ label = "Let’s talk", className = "" }) => (
    <a className={`talk-button ${className}`} href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
        {label} <span aria-hidden="true">→</span>
    </a>
);

export default TalkButton;
