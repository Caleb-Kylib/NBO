import React, { createContext, useContext, useState, useEffect } from 'react';

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

    const registerBusiness = (email, password, businessName) => {
        // Check if account already exists
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
        setBusinessData(data);
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
