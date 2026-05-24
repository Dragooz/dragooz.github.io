import { useEffect, useState, useCallback } from "react";
import Home from "../components/Home";
import MouseFollower from "../components/MouseFollower";
import Navbar from "../components/Navbar";
import ContactModal from "../components/ContactModal";
import type { NodeId } from "../components/SolarSystem";

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
    const isMobile = useBetterMediaQuery("(max-width: 767px)");
    const [activeNode, setActiveNode] = useState<NodeId | null>(null);
    const [showContact, setShowContact] = useState(false);
    const openContact = useCallback(() => setShowContact(true), []);

    return (
        <>
            <Navbar activeNode={activeNode} setActiveNode={setActiveNode} openContact={openContact} />
            {isMobile ? null : <MouseFollower />}
            <Home activeNode={activeNode} setActiveNode={setActiveNode} openContact={openContact} />
            <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
        </>
    );
}
