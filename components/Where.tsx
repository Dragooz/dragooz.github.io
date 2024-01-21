import React, { useRef, useEffect } from "react";

const Where = ({ className = "" }: { className?: string }) => {
    return (
        <div id="where" className={className}>
            <div>Where</div>
            <div>Telecommunication</div>
            {/* <div>Education - Platform for Kintergarden Teacher to use</div> */}
            <div>Retail - Furniture Store</div>
            <div>Finance - Estate Planning & Trust</div>
        </div>
    );
};

export default Where;
