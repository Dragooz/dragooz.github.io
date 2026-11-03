import React from "react";
import { FaPuzzlePiece } from "react-icons/fa";

const WhatItTakes: React.FC = () => (
    <section className="section">
        <span className="eyebrow">What it actually takes</span>
        <div className="takes-strip">
            <div className="takes-box">
                <span className="eyebrow eyebrow-muted">You have</span>
                <h3>Your business</h3>
                <p>You know how it runs, and where it hurts.</p>
            </div>
            <span className="takes-plus" aria-hidden="true">+</span>
            <div className="takes-box">
                <span className="eyebrow eyebrow-muted">Already exists</span>
                <h3>The tools</h3>
                <p>AI, automation, the SaaS you already pay for.</p>
            </div>
            <span className="takes-plus" aria-hidden="true">+</span>
            <div className="takes-box takes-box-me">
                <span className="eyebrow"><FaPuzzlePiece aria-hidden="true" /> The missing piece · me</span>
                <h3>Making them fit</h3>
                <p>I learn how your business runs, then build what holds up on real data, every day.</p>
            </div>
        </div>
    </section>
);

export default WhatItTakes;
