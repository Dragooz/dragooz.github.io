import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Home from "../components/Home";
import MouseFollower from "../components/MouseFollower";
import Navbar from "../components/Navbar";

export function useBetterMediaQuery(mediaQueryString: string): boolean | null {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQueryString);
        const listener = () => setMatches(!!mediaQueryList.matches);
        listener();
        mediaQueryList.addEventListener("change", listener);
        return () => mediaQueryList.removeEventListener("change", listener);
    }, [mediaQueryString]);

    return matches;
}

export default function Page() {
    const [isMenu, setIsMenu] = useState(false);
    const isMobile = useBetterMediaQuery("(max-width: 767px)");
    return (
        <>
            <Navbar />
            {isMobile ? null : <MouseFollower />}
            {isMenu ? <Menu /> : <Home />}
        </>
    );
}
