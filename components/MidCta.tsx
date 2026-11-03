import React from "react";
import TalkButton from "./TalkButton";

const MidCta: React.FC = () => (
    <section className="section">
        <div className="cta-row">
            <h2 className="section-title">
                Not sure where to start? <span className="accent">That is the diagnosis. It is free.</span>
            </h2>
            <TalkButton />
        </div>
    </section>
);

export default MidCta;
