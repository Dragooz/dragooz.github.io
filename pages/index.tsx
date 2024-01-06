import { useState } from "react";
import Menu from "../components/Menu";
import Home from "../components/Home";
import MouseFollower from "../components/MouseFollower";
import Navbar from "../components/Navbar";

export default function Page() {
    const [isMenu, setIsMenu] = useState(false);

    return (
        <>
            <Navbar />
            <MouseFollower />
            {isMenu ? <Menu /> : <Home />}
        </>
    );
}
