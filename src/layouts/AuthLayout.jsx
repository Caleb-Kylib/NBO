import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Outlet />

            {/* Small legal footer */}
            <footer className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/60">
                © {new Date().getFullYear()} Nairobiz · Privacy · Terms
            </footer>
        </div>
    );
};

export default AuthLayout;
