// src/pages/Categories.jsx
import React from 'react';
import CategoryCard from '../components/ui/CategoryCard';
import { categoryDefinitions } from '../data/categories';

const Categories = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Explore Nairobi by <span className="text-blue-600">Category</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover the best local gems, from artisan bakeries to professional services,
                        all verified and rated by the community.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categoryDefinitions.map((cat, index) => (
                        <CategoryCard key={index} category={cat.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
