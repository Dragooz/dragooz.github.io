import { useState } from "react";
import Menu from "../components/Menu";
import Home from "../components/Home";

export default function Page() {
    const [isMenu, setIsMenu] = useState(false);

    return isMenu ? <Menu /> : <Home />;
}
