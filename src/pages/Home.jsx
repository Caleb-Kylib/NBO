// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import CategoryCard from '../components/ui/CategoryCard';
import { motion } from 'framer-motion';

const categories = ["Plumber", "Restaurant", "Mechanic", "Beauty & Spa", "Designers", "Cafe", "Real Estate", "Services"];

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-blue-600 text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
                    >
                        Find trusted businesses <br className="hidden md:block" /> in Nairobi
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
                    >
                        Connect with top-rated local professionals and discover the best services in your area.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-12"
                    >
                        <SearchBar className="shadow-lg" />
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
                        <span>Popular:</span>
                        <Link to="/search?category=Plumber" className="hover:text-white underline decoration-blue-400 underline-offset-4">Plumbers</Link>
                        <Link to="/search?category=Restaurant" className="hover:text-white underline decoration-blue-400 underline-offset-4">Restaurants</Link>
                        <Link to="/search?category=Mechanic" className="hover:text-white underline decoration-blue-400 underline-offset-4">Mechanics</Link>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Categories</h2>
                            <p className="text-gray-500">Find exactly what you are looking for</p>
                        </div>
                        <Link to="/categories" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">View All &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {categories.slice(0, 4).map((cat, index) => (
                            <CategoryCard key={index} category={cat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Are you a business owner?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">List your business on Nairobiz to reach more customers and grow your brand online. It's fast, easy, and free.</p>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        List Your Business Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
