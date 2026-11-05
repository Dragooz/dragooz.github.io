import React, { useState } from "react";

// Char codes, not a string: the address never appears in source, HTML or the JS bundle,
// so scrapers that grep for "@" find nothing. It is assembled only on a real click.
const EMAIL_CHAR_CODES: readonly number[] = [
    98, 121, 105, 99, 104, 111, 110, 103, 103, 111, 104, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109,
];

const EmailReveal: React.FC = () => {
    const [emailAddress, setEmailAddress] = useState<string | null>(null);

    if (emailAddress === null) {
        return (
            <button
                type="button"
                className="footer-nav-button"
                onClick={(): void => setEmailAddress(String.fromCharCode(...EMAIL_CHAR_CODES))}
            >
                Email
            </button>
        );
    }

    return <a href={`mailto:${emailAddress}`}>{emailAddress}</a>;
};

export default EmailReveal;
