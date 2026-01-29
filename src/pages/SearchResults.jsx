// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BusinessCard from '../components/ui/BusinessCard';
import { useAuth } from '../context/AuthContext';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const categoryFilter = searchParams.get('category') || '';

    const { allBusinesses } = useAuth();
    const [title, setTitle] = useState('All Businesses');
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [filterVerified, setFilterVerified] = useState(false);
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        let results = [...allBusinesses];

        if (query) {
            results = results.filter(b =>
                b.name.toLowerCase().includes(query.toLowerCase()) ||
                b.category.toLowerCase().includes(query.toLowerCase()) ||
                (Array.isArray(b.services)
                    ? b.services.some(s => s.toLowerCase().includes(query.toLowerCase()))
                    : b.services.toLowerCase().includes(query.toLowerCase()))
            );
            setTitle(`Results for "${query}"`);
        } else if (categoryFilter) {
            results = results.filter(b => b.category === categoryFilter);
            setTitle(`${categoryFilter} in Nairobi`);
        } else {
            setTitle('All Businesses');
        }

        if (filterVerified) {
            results = results.filter(b => b.trustStatus === 'verified');
        }

        if (locationFilter) {
            results = results.filter(b => b.location.toLowerCase().includes(locationFilter.toLowerCase()));
        }

        setFilteredBusinesses(results);
    }, [query, categoryFilter, filterVerified, locationFilter, allBusinesses]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Filters</h3>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    placeholder="Filter by location"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                                        checked={filterVerified}
                                        onChange={(e) => setFilterVerified(e.target.checked)}
                                    />
                                    <span className="text-sm text-gray-700">Verified Only</span>
                                </label>
                            </div>

                            <button
                                onClick={() => { setFilterVerified(false); setLocationFilter(''); }}
                                className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <main className="flex-grow">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                            <p className="text-gray-500 text-sm mt-1">Showing {filteredBusinesses.length} results</p>
                        </div>

                        {filteredBusinesses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredBusinesses.map(business => (
                                    <BusinessCard key={business.id} business={business} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 mb-4">No businesses found matching your criteria.</p>
                                <button
                                    onClick={() => { setFilterVerified(false); setLocationFilter(''); }}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
