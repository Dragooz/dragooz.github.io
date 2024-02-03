import Image from "next/image";
import React from "react";

const CustomResponsiveImage = ({
    src,
    alt,
    width,
    height,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
}) => {
    return (
        <Image
            src={src}
            alt={alt}
            style={{
                width: "100%",
                height: "auto",
            }}
            width={width}
            height={height}
            quality={75}
        />
    );
};

export default CustomResponsiveImage;
