import React, { useRef, useEffect } from "react";

const Who = ({ className = "" }: { className?: string }) => {
    return (
        <div id="who" className={className}>
            <div>Who</div>
            <div>
                Information Technolgies, Artificial Intelligence, University
                Malaya 2023 Graduate
            </div>
            <div>Enjoy Problem Solving</div>
            <div>Enjoy Logical Structural approach to solve prob</div>
            <div>Enjoy Analysing Data</div>
            <div>Enjoy Playing Chess & Badminton & Doing Digital Art</div>
        </div>
    );
};

export default Who;
