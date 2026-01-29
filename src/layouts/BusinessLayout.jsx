import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiLayout, FiBriefcase, FiCheckCircle, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const BusinessLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const { logoutBusiness, hasBusiness } = useAuth();

    const sidebarLinks = [
        { name: "Dashboard", path: "/business/dashboard", icon: FiLayout, show: true },
        { name: "My Business", path: "/business/edit", icon: FiBriefcase, show: hasBusiness },
        { name: "Verification", path: "/business/verification", icon: FiCheckCircle, show: hasBusiness },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex flex-col h-full p-6 pt-20 md:pt-8 lowercase font-medium">
                    <div className="flex items-center gap-3 px-4 mb-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 capitalize">nairobiz.</span>
                    </div>

                    <nav className="flex-1 space-y-1">
                        {sidebarLinks.map((link) => link.show && (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${isActive(link.path)
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                                `}
                            >
                                <link.icon size={20} />
                                <span className="capitalize">{link.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                        <button
                            onClick={logoutBusiness}
                            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
                        >
                            <FiLogOut size={20} />
                            <span className="capitalize font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Nav */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                        <FiMenu size={24} />
                    </button>
                    <span className="font-bold text-slate-900">Dashboard</span>
                    <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default BusinessLayout;
