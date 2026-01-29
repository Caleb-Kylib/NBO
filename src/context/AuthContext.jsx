import React, { createContext, useContext, useState, useEffect } from 'react';
import { businesses as initialBusinesses } from '../data/businesses';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Mock user accounts "database"
    const [accounts, setAccounts] = useState(() => {
        const saved = localStorage.getItem('nb_accounts');
        return saved ? JSON.parse(saved) : [];
    });

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('nb_user');
        return saved ? JSON.parse(saved) : null;
    });

    // Global businesses list
    const [allBusinesses, setAllBusinesses] = useState(() => {
        const saved = localStorage.getItem('nb_all_businesses');
        return saved ? JSON.parse(saved) : initialBusinesses;
    });

    const [businessData, setBusinessData] = useState(() => {
        const saved = localStorage.getItem('nb_business');
        return saved ? JSON.parse(saved) : null;
    });

    const hasBusiness = !!businessData;

    useEffect(() => {
        localStorage.setItem('nb_accounts', JSON.stringify(accounts));
    }, [accounts]);

    useEffect(() => {
        localStorage.setItem('nb_user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('nb_business', JSON.stringify(businessData));
    }, [businessData]);

    useEffect(() => {
        localStorage.setItem('nb_all_businesses', JSON.stringify(allBusinesses));
    }, [allBusinesses]);

    const registerBusiness = (email, password, businessName) => {
        if (accounts.find(a => a.email === email)) {
            return { success: false, message: "Account already exists." };
        }

        const newAccount = { email, password, businessName };
        setAccounts(prev => [...prev, newAccount]);
        return { success: true };
    };

    const loginBusiness = (email, password) => {
        const account = accounts.find(a => a.email === email);

        if (!account) {
            return { success: false, type: 'no_account', message: "No account found. Please create an account to continue." };
        }

        if (account.password !== password) {
            return { success: false, type: 'wrong_password', message: "Incorrect password." };
        }

        setUser(account);
        return { success: true };
    };

    const saveBusinessProfile = (data) => {
        const businessId = `b-${Date.now()}`;
        const newBusiness = {
            ...data,
            id: businessId,
            rating: 5.0,
            reviewCount: 3,
            trustStatus: "pending",
            services: typeof data.services === 'string' ? data.services.split(',').map(s => s.trim()) : (data.services || []),
            image: data.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
            reviews: [
                { id: 1, user: "John Doe", rating: 5, comment: "Excellent service!", date: "2024-01-20" },
                { id: 2, user: "Sarah W.", rating: 4, comment: "Very professional and timely.", date: "2024-01-18" },
                { id: 3, user: "Nairobiz User", rating: 5, comment: "Glad to see this business online!", date: "2024-01-15" }
            ]
        };

        setBusinessData(newBusiness);

        // Update global list - if edit mode, replace, if create, add
        setAllBusinesses(prev => {
            const index = prev.findIndex(b => b.id === businessData?.id);
            if (index !== -1) {
                const updated = [...prev];
                updated[index] = { ...prev[index], ...newBusiness, id: prev[index].id }; // Keep original ID if editing
                return updated;
            }
            return [...prev, newBusiness];
        });

        return businessId;
    };

    const logoutBusiness = () => {
        setUser(null);
        setBusinessData(null);
        localStorage.removeItem('nb_user');
        localStorage.removeItem('nb_business');
    };

    return (
        <AuthContext.Provider value={{
            isBusinessLoggedIn: !!user,
            user,
            businessData,
            allBusinesses,
            hasBusiness,
            registerBusiness,
            loginBusiness,
            logoutBusiness,
            saveBusinessProfile
        }}>
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
