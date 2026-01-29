// src/pages/BusinessProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaStar, FaCheckCircle, FaUserCircle, FaCreditCard } from 'react-icons/fa';
import TrustBadge from '../components/ui/TrustBadge';
import { useAuth } from '../context/AuthContext';
import { businessService } from '../services/businessService';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';

const BusinessProfile = () => {
    const { id } = useParams();
    const { isBusinessLoggedIn, getPlaceholderImage } = useAuth();

    const [business, setBusiness] = useState(null);
    const [credentials, setCredentials] = useState([]);
    const [claimData, setClaimData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPageData = async () => {
            try {
                setIsLoading(true);
                const [bizData, credsData, claim] = await Promise.all([
                    businessService.getBusinessById(id),
                    businessService.getPaymentCredentials(id),
                    businessService.getMerchantClaim(id)
                ]);

                setBusiness(bizData);
                setCredentials(credsData);
                setClaimData(claim);
            } catch (err) {
                console.error('Error loading business profile:', err);
                setError('Could not load business profile.');
            } finally {
                setIsLoading(false);
            }
        };

        loadPageData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FiLoader className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    if (error || !business) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <FiAlertCircle className="text-rose-500 mb-4" size={48} />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{error || 'Business not found'}</h2>
                <Link to="/" className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Return Home</Link>
            </div>
        );
    }

    const defaultReviews = [
        { id: 101, user: "James Kamau", rating: 5, comment: "Authentic and reliable. Highly recommend!", date: "2024-01-10" },
        { id: 102, user: "Mercy Wanjiku", rating: 4, comment: "Great experience overall. Friendly staff.", date: "2024-01-05" },
        { id: 103, user: "David Ouma", rating: 5, comment: "Best service I've had in Nairobi this year.", date: "2023-12-28" }
    ];

    const displayReviews = business.reviews || defaultReviews;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Owner Context Banner */}
            {isBusinessLoggedIn && (
                <div className="bg-blue-600 text-white py-3 px-4 shadow-sm relative z-10">
                    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <FaCheckCircle className="text-white" />
                            <span className="text-sm font-medium">This is how customers see your business profile</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 max-w-5xl pt-8">
                {/* Header Card */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-8">
                    <div className="h-72 md:h-96 relative">
                        <img
                            src={business.image || getPlaceholderImage(business.category)}
                            alt={business.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 right-10 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-600/90 backdrop-blur-md text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">{business.category}</span>
                                <TrustBadge status={business.trustStatus} />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">{business.name}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-slate-200 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-blue-400" size={18} />
                                    <span>{business.location}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                                    <FaStar className="text-amber-400" />
                                    <span className="font-bold text-white tracking-wide">{business.rating}</span>
                                    <span className="opacity-60 font-medium">({business.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">About {business.name}</h2>
                            <p className="text-slate-500 leading-relaxed mb-10 text-lg font-medium">
                                {business.description || `${business.name} is a top establishment located in ${business.location}, offering premium services in the ${business.category} category.`}
                            </p>

                            {business.services && business.services.length > 0 && (
                                <>
                                    <h3 className="font-black text-slate-400 mb-4 uppercase tracking-[0.2em] text-[10px]">Services & Specialties</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {(Array.isArray(business.services) ? business.services : []).map((service, index) => (
                                            <span key={index} className="px-5 py-2.5 bg-slate-50 text-slate-900 rounded-2xl text-sm font-bold border border-slate-100 italic">
                                                #{service}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Payment Credentials */}
                        {credentials.length > 0 && (
                            <div className="bg-blue-50/50 rounded-[2rem] border border-blue-100 p-10">
                                <h2 className="text-2xl font-black text-blue-900 mb-6 tracking-tight flex items-center gap-3">
                                    <FaCreditCard className="text-blue-600" />
                                    Verified Payment Methods
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {credentials.map(cred => (
                                        <div key={cred.id} className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                                            <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">{cred.type}</p>
                                            <p className="text-lg font-black text-slate-900 tracking-tight">{cred.credential}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews Section */}
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-10">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display">Customer Experience</h2>
                                <button className="text-blue-600 font-black text-sm hover:underline tracking-tight">Review Biz</button>
                            </div>

                            <div className="space-y-10">
                                {displayReviews.map((review) => (
                                    <div key={review.id} className="border-b border-slate-50 last:border-0 pb-10 last:pb-0">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                    <FaUserCircle size={32} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-sm tracking-tight">{review.user}</p>
                                                    <p className="text-slate-400 text-xs font-bold">{new Date(review.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-amber-400 gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} size={14} className={i < review.rating ? "text-amber-400" : "text-slate-100"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-medium italic leading-relaxed">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Interaction */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 sticky top-24">
                            <h3 className="font-black text-slate-900 mb-6 text-lg tracking-tight">Contact Establishing</h3>
                            <div className="space-y-4">
                                <a href={`tel:${business.phone}`} className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 tracking-wide text-sm">
                                    <FaPhone className="text-blue-400" /> CALL NOW
                                </a>
                                <a href={`https://wa.me/${business.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-5 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-emerald-100 tracking-wide text-sm">
                                    <FaWhatsapp className="text-xl" /> WHATSAPP
                                </a>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-50">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-3">Verified Merchant</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 font-black">
                                        N
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-black text-sm tracking-tight">{business.name}</p>
                                        <p className="text-slate-400 text-[11px] font-bold">{business.location_area || 'Nairobi Area'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Nudge */}
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <h4 className="font-black text-xl mb-3 tracking-tight">Trust & Safety</h4>
                            <p className="text-white/70 text-sm mb-6 font-medium leading-relaxed">This business is protected by Nairobiz merchant standards. Always pay via verified channels.</p>
                            <Link to="/" className="text-white font-black text-[10px] uppercase tracking-widest bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-all">Verification Guide</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;
