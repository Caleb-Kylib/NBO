import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { businessService } from '../services/businessService';
import { businesses as initialBusinesses } from '../data/businesses';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [businessData, setBusinessData] = useState(null);
    const [allBusinesses, setAllBusinesses] = useState(initialBusinesses);
    const [isLoading, setIsLoading] = useState(true);

    // Initial auth check and listener
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                await fetchUserBusiness(user.id);
            }
            setIsLoading(false);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserBusiness(session.user.id);
            } else {
                setBusinessData(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserBusiness = async (userId) => {
        try {
            const data = await businessService.getBusinessByOwnerId(userId);
            if (data) {
                const processed = {
                    ...data,
                    trustStatus: data.verified ? 'verified' : 'pending',
                    rating: data.trust_score || 5.0,
                    reviewCount: 3,
                    image: data.profile_image || getPlaceholderImage(data.category),
                    services: Array.isArray(data.services) ? data.services : (typeof data.services === 'string' ? data.services.split(',').map(s => s.trim()) : [])
                };
                setBusinessData(processed);
            } else {
                setBusinessData(null);
            }
        } catch (error) {
            console.error('Error fetching user business:', error);
        }
    };

    const getPlaceholderImage = (category) => {
        const placeholders = {
            'Restaurant': 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop',
            'Cafe': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
            'Beauty & Spa': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=600&auto=format&fit=crop',
            'Bookshops': 'https://images.unsplash.com/photo-1491843351663-8511e0dc6b3d?q=80&w=600&auto=format&fit=crop',
            'Bakeries': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
            'Pharmacy & Health Stores': 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=600&auto=format&fit=crop',
            'Butcheries': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc822?q=80&w=600&auto=format&fit=crop',
            'Wine & Beverage Shops': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
            'Stationery & Office Supplies': 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=600&auto=format&fit=crop'
        };
        return placeholders[category] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop';
    };

    const saveBusinessProfile = async (data) => {
        if (!user) throw new Error("You must be logged in");

        try {
            let result;
            if (businessData?.id) {
                result = await businessService.updateBusiness(businessData.id, data);
            } else {
                result = await businessService.createBusiness(data, user.id);
            }

            const processed = {
                ...result,
                trustStatus: result.verified ? 'verified' : 'pending',
                rating: result.trust_score || 5.0,
                reviewCount: 3,
                image: result.profile_image || getPlaceholderImage(result.category),
                services: Array.isArray(result.services) ? result.services : (typeof result.services === 'string' ? result.services.split(',').map(s => s.trim()) : [])
            };

            setBusinessData(processed);
            return processed.id;
        } catch (error) {
            console.error('Error saving business profile:', error);
            throw error;
        }
    };

    const logoutBusiness = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setBusinessData(null);
    };

    return (
        <AuthContext.Provider value={{
            isBusinessLoggedIn: !!user,
            user,
            businessData,
            allBusinesses,
            hasBusiness: !!businessData,
            isLoading,
            logoutBusiness,
            saveBusinessProfile,
            getPlaceholderImage,
            refreshBusiness: () => fetchUserBusiness(user?.id)
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
