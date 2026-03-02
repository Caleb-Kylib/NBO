import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

import WhatsAppChat from "../components/chat/WhatsAppChat.jsx";
import ErrorBoundary from "../components/ui/ErrorBoundary.jsx";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
            <WhatsAppChat />
        </>
    );
};

export default MainLayout;
