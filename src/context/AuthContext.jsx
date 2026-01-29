import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isBusinessLoggedIn, setIsBusinessLoggedIn] = useState(() => {
        // Check localStorage on initialization
        return localStorage.getItem('isBusinessLoggedIn') === 'true';
    });

    const loginBusiness = () => {
        setIsBusinessLoggedIn(true);
        localStorage.setItem('isBusinessLoggedIn', 'true');
    };

    const logoutBusiness = () => {
        setIsBusinessLoggedIn(false);
        localStorage.removeItem('isBusinessLoggedIn');
    };

    return (
        <AuthContext.Provider value={{ isBusinessLoggedIn, loginBusiness, logoutBusiness }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
