import React, { useRef } from "react";
import ContactForm from "./ContactForm";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

// What happens after the first message. Owners fear a sales pitch, so say it plainly.
const NEXT_STEPS: string[] = [
    "You send 1 message.",
    "I ask 3 short questions.",
    "We book a free 30-minute call. No obligation.",
];

// Desktop: the button opens a popup, WhatsApp first, the email form under it.
// Phone (coarse pointer): the button opens WhatsApp directly, 1 tap instead of 2.
// The button stays a real WhatsApp link, so it still works when JavaScript does not run.
const TalkButton: React.FC<{ label?: string; className?: string }> = ({
    label = "WhatsApp me: free 30-min call",
    className = "",
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        event.preventDefault();
        dialogRef.current?.showModal();
    };

    const closeDialog = (): void => {
        dialogRef.current?.close();
    };

    // A click on the backdrop lands on the <dialog> itself, not on its content.
    const closeOnBackdropClick = (event: React.MouseEvent<HTMLDialogElement>): void => {
        if (event.target === dialogRef.current) {
            closeDialog();
        }
    };

    return (
        <>
            <a className={`talk-button ${className}`} href={WHATSAPP_CHAT_URL} onClick={openDialog}>
                {label} <span aria-hidden="true">→</span>
            </a>
            <dialog ref={dialogRef} className="talk-dialog" aria-label="Free 30-minute call" onClick={closeOnBackdropClick}>
                <div className="talk-dialog-header">
                    <h2>Free 30-minute call</h2>
                    <button type="button" className="talk-dialog-close" onClick={closeDialog} aria-label="Close">
                        ✕
                    </button>
                </div>
                <ol className="talk-dialog-steps">
                    {NEXT_STEPS.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
                <p className="talk-dialog-reply">I reply the same business day.</p>
                <a className="talk-button" href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp me <span aria-hidden="true">→</span>
                </a>
                <p className="talk-dialog-divider">Or email me</p>
                <ContactForm />
            </dialog>
        </>
    );
};

export default TalkButton;
