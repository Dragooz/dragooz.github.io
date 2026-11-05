import React, { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/mjgzodro";

type ContactFormStatus = "idle" | "sending" | "sent" | "failed";

// Fallback for visitors who do not use WhatsApp. Only a 2xx from Formspree counts as sent.
const ContactForm: React.FC = () => {
    const [status, setStatus] = useState<ContactFormStatus>("idle");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setStatus("sending");
        const formData: FormData = new FormData(event.currentTarget);
        try {
            const response: Response = await fetch(FORMSPREE_URL, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });
            setStatus(response.ok ? "sent" : "failed");
        } catch {
            setStatus("failed");
        }
    };

    if (status === "sent") {
        return <p className="contact-sent" role="status">Sent. I will reply by email.</p>;
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-field">
                <span>Name</span>
                <input className="contact-input" type="text" name="name" autoComplete="name" />
            </label>
            <label className="contact-field">
                <span>Email</span>
                <input className="contact-input" type="email" name="email" autoComplete="email" required />
            </label>
            <label className="contact-field">
                <span>Message</span>
                <textarea className="contact-input" name="message" rows={4} required />
            </label>
            {/* Honeypot: hidden from people, filled by bots, rejected by Formspree. */}
            <input className="contact-honeypot" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {status === "failed" && (
                <p className="contact-failed" role="alert">Message not sent. Use WhatsApp above instead.</p>
            )}
            <button className="contact-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send"}
            </button>
        </form>
    );
};

export default ContactForm;
