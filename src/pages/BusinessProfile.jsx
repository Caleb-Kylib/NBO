// src/pages/BusinessProfile.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaStar, FaCheckCircle, FaUserCircle } from 'react-icons/fa';
import TrustBadge from '../components/ui/TrustBadge';
import { useAuth } from '../context/AuthContext';

const BusinessProfile = () => {
    const { id } = useParams();
    const { isBusinessLoggedIn, allBusinesses } = useAuth();

    // Find business in global state
    const business = allBusinesses.find(b => b.id === id);

    if (!business) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Business not found</h2>
                <p className="text-slate-500 mb-6">The business you're looking for might have been moved or deleted.</p>
                <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Return Home</Link>
            </div>
        );
    }

    // Default reviews if none exist
    const defaultReviews = [
        { id: 101, user: "James Kamau", rating: 5, comment: "Authentic and reliable. Highly recommend!", date: "2024-01-10" },
        { id: 102, user: "Mercy Wanjiku", rating: 4, comment: "Great experience overall. Friendly staff.", date: "2024-01-05" },
        { id: 103, user: "David Ouma", rating: 5, comment: "Best service I've had in Nairobi this year.", date: "2023-12-28" }
    ];

    const displayReviews = business.reviews || defaultReviews;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Owner Context Banner */}
            {isBusinessLoggedIn && (
                <div className="bg-blue-600 text-white py-3 px-4 shadow-sm relative z-10">
                    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="text-white" />
                            </div>
                            <span className="text-sm font-medium">This is how customers see your business profile</span>
                        </div>
                        {business.trustStatus !== 'verified' && (
                            <Link
                                to="/business/verification"
                                className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-50 transition-all flex items-center gap-2"
                            >
                                <FaCheckCircle /> Verify your business to build trust
                            </Link>
                        )}
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 max-w-5xl pt-8">
                {/* Header Card */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-8">
                    <div className="h-72 md:h-96 relative">
                        <img
                            src={business.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"}
                            alt={business.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-600/90 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{business.category}</span>
                                <TrustBadge status={business.trustStatus} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3">{business.name}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-blue-400" />
                                    <span>{business.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                                    <FaStar className="text-amber-400" />
                                    <span className="font-bold">{business.rating}</span>
                                    <span className="opacity-60">({business.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">About the Business</h2>
                            <p className="text-slate-600 leading-relaxed mb-8 text-lg">{business.description}</p>

                            {business.services && (
                                <>
                                    <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Services & Specialties</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(Array.isArray(business.services) ? business.services : []).map((service, index) => (
                                            <span key={index} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-medium border border-slate-100">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 font-display">Customer Reviews</h2>
                                <button className="text-blue-600 font-bold text-sm hover:underline">Write a Review</button>
                            </div>

                            <div className="space-y-8">
                                {displayReviews.map((review) => (
                                    <div key={review.id} className="border-b border-slate-50 last:border-0 pb-8 last:pb-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                    <FaUserCircle size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{review.user}</p>
                                                    <p className="text-slate-400 text-xs">{new Date(review.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-amber-400 text-xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < review.rating ? "text-amber-400" : "text-slate-200"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
                                Load More Reviews
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Interaction */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-6 text-lg">Contact & Booking</h3>
                            <div className="space-y-3">
                                <a href={`tel:${business.phone}`} className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                                    <FaPhone /> Call Business
                                </a>
                                {business.whatsapp && (
                                    <a href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-100">
                                        <FaWhatsapp className="text-xl" /> Chat on WhatsApp
                                    </a>
                                )}
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Location</p>
                                <p className="text-slate-900 font-semibold">{business.location}</p>
                                <button className="mt-4 text-blue-600 text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    Get Directions <FaMapMarkerAlt />
                                </button>
                            </div>
                        </div>

                        {/* Trust Nudge */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200">
                            <h4 className="font-bold text-lg mb-2">Nairobiz Verified</h4>
                            <p className="text-white/80 text-sm mb-4">This business has been vetted for quality and reliability.</p>
                            <Link to="/about" className="text-white font-bold text-xs underline">Learn about our trust score</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;
