// src/pages/SearchResults.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import BusinessCard from '../components/ui/BusinessCard';
import { businessService } from '../services/businessService';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const categoryFilter = searchParams.get('category') || '';

    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const LIMIT = 9;

    const [filterVerified, setFilterVerified] = useState(false);
    const [locationFilter, setLocationFilter] = useState('');

    const fetchBusinesses = useCallback(async (isNewSearch = false) => {
        try {
            setIsLoading(true);
            const currentOffset = isNewSearch ? 0 : page * LIMIT;

            const { data, count } = await businessService.getBusinesses({
                category: categoryFilter,
                search: query,
                limit: LIMIT,
                offset: currentOffset
            });

            if (isNewSearch) {
                setBusinesses(data);
                setPage(1);
            } else {
                setBusinesses(prev => [...prev, ...data]);
                setPage(prev => prev + 1);
            }

            setTotalCount(count);
            setHasMore(businesses.length + data.length < count);
            setError(null);
        } catch (err) {
            console.error('Error fetching businesses:', err);
            setError('Failed to load businesses. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [categoryFilter, query, page, businesses.length]);

    // Initial fetch when query or category changes
    useEffect(() => {
        fetchBusinesses(true);
    }, [query, categoryFilter]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchBusinesses(false);
        }
    };

    // Derived filtering for local toggles (verified, nested location)
    // In a real app, these should ideally also be server-side if data is large
    const displayedBusinesses = businesses.filter(b => {
        if (filterVerified && !b.verified) return false;
        if (locationFilter && !b.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
                                Search Filters
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Area / Neighborhood</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Westlands"
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${filterVerified ? 'bg-blue-600 border-blue-600' : 'border-slate-200 group-hover:border-blue-400'}`}>
                                            {filterVerified && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={filterVerified}
                                            onChange={(e) => setFilterVerified(e.target.checked)}
                                        />
                                        <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">Verified Listings</span>
                                    </label>
                                </div>

                                <button
                                    onClick={() => { setFilterVerified(false); setLocationFilter(''); }}
                                    className="w-full py-3 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors pt-4 border-t border-slate-50"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <main className="flex-grow">
                        <div className="mb-10">
                            <h1 className="text-3xl font-black text-slate-900 mb-2">
                                {query ? `Results for "${query}"` : categoryFilter ? `${categoryFilter} in Nairobi` : 'All Businesses'}
                            </h1>
                            <p className="text-slate-500 font-medium">Found {totalCount} verified establishments</p>
                        </div>

                        {error && (
                            <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex items-center gap-4 text-rose-600 mb-8">
                                <FiAlertCircle size={24} />
                                <p className="font-bold">{error}</p>
                            </div>
                        )}

                        {displayedBusinesses.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {displayedBusinesses.map(business => (
                                        <BusinessCard key={business.id} business={business} />
                                    ))}
                                </div>

                                {hasMore && (
                                    <div className="mt-16 text-center">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={isLoading}
                                            className="inline-flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <FiLoader className="animate-spin" />
                                                    Loading...
                                                </>
                                            ) : (
                                                'Load More Results'
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : !isLoading && (
                            <div className="bg-white rounded-[2rem] border border-slate-100 p-20 text-center flex flex-col items-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                    <FiAlertCircle size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No businesses found</h3>
                                <p className="text-slate-400 font-medium max-w-sm">We couldn't find any listings matching your current search or filters.</p>
                                <button
                                    onClick={() => { setFilterVerified(false); setLocationFilter(''); }}
                                    className="mt-8 text-blue-600 font-bold hover:underline"
                                >
                                    Clear all filters and try again
                                </button>
                            </div>
                        )}

                        {isLoading && displayedBusinesses.length === 0 && (
                            <div className="flex justify-center py-20">
                                <div className="flex flex-col items-center gap-4">
                                    <FiLoader className="animate-spin text-blue-600" size={40} />
                                    <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Fetching Data...</p>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
