import React, { useRef, useEffect } from "react";

const What = ({ className = "" }: { className?: string }) => {
    return (
        <div id="what" className={className}>
            <div>Forecasting Estimated Fetal Weight</div>
            <div>Map System for farmer in agriculture domain</div>
            <div>Huawei Malaysia Sales Elite Challenge - Team Spark</div>
        </div>
    );
};

export default What;
