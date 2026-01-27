// src/components/ui/BusinessCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import TrustBadge from './TrustBadge';

const BusinessCard = ({ business }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative h-40 bg-gray-200">
                <img
                    src={business.image || "https://via.placeholder.com/400x200?text=No+Image"}
                    alt={business.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                    <TrustBadge status={business.trustStatus} />
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">{business.category}</p>
                    <div className="flex items-center gap-1 text-slate-700">
                        <FaStar className="text-amber-400 text-sm" />
                        <span className="text-sm font-bold">{business.rating}</span>
                        <span className="text-xs text-gray-500">({business.reviewCount})</span>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{business.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <FaMapMarkerAlt className="flex-shrink-0" />
                    <span className="truncate">{business.location}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{business.description}</p>

                <Link to={`/business/${business.id}`} className="block w-full text-center py-2 rounded-lg bg-gray-50 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                    View Profile
                </Link>
            </div>
        </div>
    );
};

export default BusinessCard;
