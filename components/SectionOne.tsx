import Image from "next/image";

const SectionOne = () => {
    return (
        <>
            <div id="introduction">
                <div>
                    Welcome to a place where{" "}
                    <span className="highlight blue">Code</span> dances with{" "}
                    <span className="highlight red">Creativity</span>
                </div>
                <div className="bgImage" />
            </div>
        </>
    );
};

export default SectionOne;
