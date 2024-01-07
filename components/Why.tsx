import React, { useRef, useEffect } from "react";

const Why = ({ className = "" }: { className?: string }) => {
    return (
        <div id="why" className={className}>
            <div>Why</div>
            <div>Satisfaction when problem solved</div>
            <div>Wish to contribute back to the community</div>
            <div>
                Enjoy the process of slowly building up something good, which is
                exactly the code process!
            </div>
        </div>
    );
};

export default Why;
