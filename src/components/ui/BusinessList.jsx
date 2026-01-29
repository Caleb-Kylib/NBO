// src/components/ui/BusinessList.jsx
import React, { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { businessService } from '../../services/businessService';
import { FiLoader, FiSearch } from 'react-icons/fi';

/**
 * Reusable Business List Component with Search and Filtering
 */
const BusinessList = ({ initialCategory = '', limit = 6 }) => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(initialCategory);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await businessService.getBusinesses({
                    category,
                    search,
                    limit
                });
                setBusinesses(data);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetch, 300);
        return () => clearTimeout(debounce);
    }, [category, search, limit]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="relative w-full md:w-96">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or area..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full md:w-48 bg-slate-50 border-none rounded-xl text-sm font-bold py-3 px-4 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="Restaurant">Restaurants</option>
                    <option value="Cafe">Cafes</option>
                    <option value="Beauty & Spa">Beauty & Spa</option>
                    <option value="Bakeries">Bakeries</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <FiLoader className="animate-spin text-blue-600" size={32} />
                </div>
            ) : businesses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {businesses.map(b => (
                        <BusinessCard key={b.id} business={b} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                    <p className="text-slate-400 font-medium">No results found for your search.</p>
                </div>
            )}
        </div>
    );
};

export default BusinessList;
