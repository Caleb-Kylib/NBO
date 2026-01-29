// src/pages/CategoryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BusinessCard from '../components/ui/BusinessCard';
import { businessService } from '../services/businessService';
import { FiArrowLeft, FiFilter, FiLoader } from 'react-icons/fi';

const CategoryDetail = () => {
    const { categoryName } = useParams();
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        const loadBusinesses = async () => {
            try {
                setIsLoading(true);
                const { data } = await businessService.getBusinesses({
                    category: categoryName,
                    limit: 50 // Fetch a good amount for the category
                });
                setBusinesses(data);
            } catch (err) {
                console.error('Error loading category businesses:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadBusinesses();
    }, [categoryName]);

    const displayedBusinesses = businesses.filter(b =>
        b.location.toLowerCase().includes(locationFilter.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            <div className="bg-white border-b border-slate-100 mb-8">
                <div className="container mx-auto px-4 py-12">
                    <Link to="/categories" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-6 font-medium">
                        <FiArrowLeft /> Back to Categories
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 mb-2">{categoryName}</h1>
                    <p className="text-slate-500">Discover top-rated {categoryName.toLowerCase()} across Nairobi.</p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold">
                                <FiFilter />
                                <h3>Quick Filters</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Location</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Westlands"
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <main className="flex-grow">
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <FiLoader className="animate-spin text-blue-600" size={32} />
                            </div>
                        ) : displayedBusinesses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedBusinesses.map(business => (
                                    <BusinessCard key={business.id} business={business} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2rem] border border-slate-100 p-20 text-center">
                                <p className="text-slate-400 font-medium italic">No businesses found in this category yet.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;
