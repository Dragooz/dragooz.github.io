import React, { useRef } from "react";
import ContactForm from "./ContactForm";
import { WHATSAPP_CHAT_URL } from "./whatsappLink";

// Every call to action opens the same popup: WhatsApp first, the email form under it.
// The button stays a real WhatsApp link, so it still works when JavaScript does not run.
const TalkButton: React.FC<{ label?: string; className?: string }> = ({ label = "Let’s talk", className = "" }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = (event: React.MouseEvent<HTMLAnchorElement>): void => {
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
            <dialog ref={dialogRef} className="talk-dialog" aria-label="Let’s talk" onClick={closeOnBackdropClick}>
                <div className="talk-dialog-header">
                    <h2>Let’s talk</h2>
                    <button type="button" className="talk-dialog-close" onClick={closeDialog} aria-label="Close">
                        ✕
                    </button>
                </div>
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
