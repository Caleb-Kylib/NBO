// src/pages/Categories.jsx
import React from 'react';
import CategoryCard from '../components/ui/CategoryCard';

const categories = ["Plumber", "Restaurant", "Mechanic", "Beauty & Spa", "Designers", "Cafe", "Real Estate", "Services"];

const Categories = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Browse through our extensive list of business categories to find exactly what you need.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} category={cat} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
