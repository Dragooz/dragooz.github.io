import Home from "../components/Home";
import Navbar from "../components/Navbar";
import MouseFollower from "../components/MouseFollower";

export default function Page() {
    return (
        <>
            <MouseFollower />
            <Navbar />
            <Home />
        </>
    );
}
