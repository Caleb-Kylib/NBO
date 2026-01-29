import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BusinessPrivateRoute = () => {
    const { isBusinessLoggedIn } = useAuth();

    // If not logged in, redirect to login page
    if (!isBusinessLoggedIn) {
        return <Navigate to="/business/login" replace />;
    }

    // If logged in, render the child components (dashboard)
    return <Outlet />;
};

export default BusinessPrivateRoute;
