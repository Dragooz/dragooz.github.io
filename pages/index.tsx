import { useState } from "react";
import Menu from "../components/Menu";
import Home from "../components/Home";
import MouseFollower from "../components/MouseFollower";

export default function Page() {
    const [isMenu, setIsMenu] = useState(false);

    return (
        <>
            <MouseFollower />
            {isMenu ? <Menu /> : <Home />}
        </>
    );
}
