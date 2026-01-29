// src/pages/BusinessProfile.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaStar, FaCheckCircle } from 'react-icons/fa';
import { businesses } from '../data/businesses';
import TrustBadge from '../components/ui/TrustBadge';

const BusinessProfile = () => {
    const { id } = useParams();
    const business = businesses.find(b => b.id === id);

    if (!business) {
        return <div className="min-h-screen flex items-center justify-center">Business not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="h-64 bg-gray-200 relative">
                        <img
                            src={business.image || "https://via.placeholder.com/1200x400?text=Cover+Image"}
                            alt={business.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{business.category}</span>
                                <TrustBadge status={business.trustStatus} />
                            </div>
                            <h1 className="text-4xl font-bold mb-2">{business.name}</h1>
                            <div className="flex items-center gap-2 text-gray-200">
                                <FaMapMarkerAlt />
                                <span>{business.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">{business.description}</p>

                            <h3 className="font-semibold text-gray-900 mb-3">Services Offered</h3>
                            <div className="flex flex-wrap gap-2">
                                {business.services.map((service, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        <FaCheckCircle className="inline-block mr-1 text-green-500 text-xs" />
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-5xl font-bold text-gray-900">{business.rating}</div>
                                <div>
                                    <div className="flex text-amber-400 text-lg mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < Math.floor(business.rating) ? "text-amber-400" : "text-gray-300"} />
                                        ))}
                                    </div>
                                    <p className="text-gray-500 text-sm">{business.reviewCount} reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <a href={`tel:${business.phone}`} className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    <FaPhone /> Call Now
                                </a>
                                {business.whatsapp && (
                                    <a href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
                                        <FaWhatsapp className="text-xl" /> WhatsApp
                                    </a>
                                )}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Location</p>
                                <p className="text-gray-900 font-medium">{business.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;
