import React from "react";
import Image from "next/image";

const TrustBar: React.FC = () => {
    return (
        <div id="trust-bar">
            <span className="trust-label">Previously worked with</span>
            <div className="trust-logos">
                <div className="trust-logo">
                    <Image
                        src="/images/deloitte-logo-square.png"
                        alt="Deloitte"
                        width={120}
                        height={56}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <div className="trust-logo">
                    <Image
                        src="/images/reluvate-logo.png"
                        alt="Reluvate"
                        width={140}
                        height={56}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <div className="trust-logo">
                    <Image
                        src="/images/swipey-square-logo.png"
                        alt="Swipey"
                        width={90}
                        height={56}
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrustBar;
