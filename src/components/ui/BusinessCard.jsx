// src/components/ui/BusinessCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import TrustBadge from './TrustBadge';
import { useAuth } from '../../context/AuthContext';

const BusinessCard = ({ business }) => {
    const { getPlaceholderImage } = useAuth();

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full group">
            <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                    src={business.image || getPlaceholderImage(business.category)}
                    alt={business.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                    <TrustBadge status={business.trustStatus} />
                </div>
                <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1.5 rounded-full text-slate-900 uppercase tracking-widest shadow-sm">
                        {business.category}
                    </span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{business.name}</h3>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                        <FaStar className="text-amber-400 text-sm" />
                        <span className="text-sm font-bold text-slate-900">{business.rating}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-4 font-medium">
                    <FaMapMarkerAlt className="text-blue-400" />
                    <span className="truncate">{business.location}</span>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-grow leading-relaxed font-normal">
                    {business.description}
                </p>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-50 mt-auto">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('prefill-chat', { detail: { businessName: business.name } }))}
                        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                        title="Chat about this business"
                    >
                        <FaWhatsapp size={20} />
                    </button>
                    <Link
                        to={`/business/profile/${business.id}`}
                        className="flex-grow inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
