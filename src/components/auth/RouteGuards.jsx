import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLoader } from 'react-icons/fi';

const LoadingScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <FiLoader className="animate-spin text-blue-600" size={40} />
    </div>
);

// Only for users NOT logged in (Login, Signup)
export const PublicRoute = () => {
    const { isBusinessLoggedIn, hasBusiness, isLoading } = useAuth();

    if (isLoading) return <LoadingScreen />;

    if (isBusinessLoggedIn) {
        return hasBusiness
            ? <Navigate to="/business/dashboard" replace />
            : <Navigate to="/business/create" replace />;
    }

    return <Outlet />;
};

// Only for logged in users WITHOUT a business profile
export const OnboardingRoute = () => {
    const { isBusinessLoggedIn, hasBusiness, isLoading } = useAuth();

    if (isLoading) return <LoadingScreen />;

    if (!isBusinessLoggedIn) {
        return <Navigate to="/business/login" replace />;
    }

    if (hasBusiness) {
        return <Navigate to="/business/dashboard" replace />;
    }

    return <Outlet />;
};

// Only for logged in users WITH a business profile
export const BusinessDashboardRoute = () => {
    const { isBusinessLoggedIn, hasBusiness, isLoading } = useAuth();

    if (isLoading) return <LoadingScreen />;

    if (!isBusinessLoggedIn) {
        return <Navigate to="/business/login" replace />;
    }

    if (!hasBusiness) {
        return <Navigate to="/business/create" replace />;
    }

    return <Outlet />;
};
