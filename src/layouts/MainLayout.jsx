import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

import WhatsAppChat from "../components/chat/WhatsAppChat.jsx";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppChat />
        </>
    );
};

export default MainLayout;
