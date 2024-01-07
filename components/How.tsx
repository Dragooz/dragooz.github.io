import React, { useRef, useEffect } from "react";

const How = ({ className = "" }: { className?: string }) => {
    return (
        <div id="how" className={className}>
            <div>How</div>
            <div>1. Understand the problem</div>
            <div>2. Get an overall picture of the problem and solution</div>
            <div>3. Breakdown the big problems to smaller problems</div>
            <div>4. Solve + Test one by one.</div>
            <div>5. Done! </div>
            <div>Next JS (FE) + Django (BE)</div>
        </div>
    );
};

export default How;
