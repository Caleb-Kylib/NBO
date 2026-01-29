import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Only for users NOT logged in (Login, Signup)
export const PublicRoute = () => {
    const { isBusinessLoggedIn, hasBusiness } = useAuth();

    if (isBusinessLoggedIn) {
        return hasBusiness
            ? <Navigate to="/business/dashboard" replace />
            : <Navigate to="/business/create" replace />;
    }

    return <Outlet />;
};

// Only for logged in users WITHOUT a business profile
export const OnboardingRoute = () => {
    const { isBusinessLoggedIn, hasBusiness } = useAuth();

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
    const { isBusinessLoggedIn, hasBusiness } = useAuth();

    if (!isBusinessLoggedIn) {
        return <Navigate to="/business/login" replace />;
    }

    if (!hasBusiness) {
        return <Navigate to="/business/create" replace />;
    }

    return <Outlet />;
};
