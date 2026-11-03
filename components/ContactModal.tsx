import React, { useState, useEffect, useRef } from "react";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

const FORMSPREE_ID = "mjgzodro";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            const resetStatusTimer = window.setTimeout(() => setStatus("idle"), 0);
            return () => window.clearTimeout(resetStatusTimer);
        }
        const handleEsc = (event: KeyboardEvent): void => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (status === "success") {
            const timer = setTimeout(onClose, 2000);
            return () => clearTimeout(timer);
        }
    }, [status, onClose]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setStatus("submitting");
        const form = event.currentTarget;
        const data = new FormData(form);

        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });
            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="contact-overlay"
            ref={overlayRef}
            onClick={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
        >
            <div className="contact-modal">
                <button className="contact-close" onClick={onClose} aria-label="Close">
                    &times;
                </button>
                <h3 className="contact-title">Get In Touch</h3>
                <p className="contact-subtitle">
                    Tell me the problem. I reply within one business day.
                    Prefer WhatsApp?{" "}
                    <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
                        Message me there
                    </a>
                    .
                </p>

                {status === "success" ? (
                    <div className="contact-success">Message sent!</div>
                ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            required
                            className="contact-input"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            required
                            className="contact-input"
                        />
                        <textarea
                            name="message"
                            placeholder="What is the problem?"
                            required
                            rows={4}
                            className="contact-input contact-textarea"
                        />
                        {status === "error" && (
                            <p className="contact-error">Something went wrong. Try again.</p>
                        )}
                        <button
                            type="submit"
                            className="contact-submit"
                            disabled={status === "submitting"}
                        >
                            {status === "submitting" ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactModal;
