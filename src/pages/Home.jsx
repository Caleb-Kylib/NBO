// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import CategoryCard from "../components/ui/CategoryCard";
import BusinessCard from "../components/ui/BusinessCard";
import { motion } from "framer-motion";
import nairobiImg from "../assets/nairobi.jpg";
import { categoryDefinitions } from "../data/categories";
import { businessService } from "../services/businessService";
import { FiLoader } from "react-icons/fi";

const Home = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = categoryDefinitions.map(cat => cat.name);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await businessService.getBusinesses({ limit: 6 });
        setFeaturedBusinesses(data);
      } catch (err) {
        console.error('Error fetching featured businesses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative text-white py-24 lg:py-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${nairobiImg})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Discover the best of <br className="hidden md:block" /> <span className="text-blue-400">Nairobi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light"
          >
            Connect with verified local businesses, from artisan bakeries to premium spas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <SearchBar className="shadow-2xl scale-110" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-gray-300">
            <span className="font-semibold text-white">Popular:</span>
            <Link to="/categories/Pharmacy %26 Health Stores" className="hover:text-white transition-colors">Pharmacies</Link>
            <Link to="/categories/Restaurant" className="hover:text-white transition-colors">Restaurants</Link>
            <Link to="/categories/Bakeries" className="hover:text-white transition-colors">Bakeries</Link>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Browse by Category</h2>
              <p className="text-gray-500 text-lg">Find exactly what you need in seconds</p>
            </div>
            <Link to="/categories" className="bg-white px-6 py-2 rounded-full border border-gray-200 text-blue-600 font-semibold hover:bg-gray-50 transition-all shadow-sm">
              View All Categories
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {categories.map((cat, index) => (
              <CategoryCard key={index} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Businesses</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Handpicked top-rated establishments across Nairobi known for their quality and service.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-10 text-blue-600">
              <FiLoader className="animate-spin" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBusinesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link to="/search" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1">
              Explore All Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Grow your brand in Nairobi</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg md:text-xl">
            Join thousands of local business owners who use Nairobiz to reach new customers every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/business/login">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                List Your Business
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
