// src/components/ui/CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import { categoryDefinitions } from '../../data/categories';

const CategoryCard = ({ category }) => {
    const definition = categoryDefinitions.find(cat => cat.name === category) || {
        icon: FaBriefcase,
        color: "blue",
    };

    const Icon = definition.icon;
    const color = definition.color;

    const colorClasses = {
        emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
        amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600",
        rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600",
        indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
        blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
        sky: "bg-sky-50 text-sky-600 group-hover:bg-sky-600",
        orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
        fuchsia: "bg-fuchsia-50 text-fuchsia-600 group-hover:bg-fuchsia-600",
    }[color] || "bg-blue-50 text-blue-600 group-hover:bg-blue-600";

    const borderHoverClasses = {
        emerald: "group-hover:border-emerald-200",
        amber: "group-hover:border-amber-200",
        rose: "group-hover:border-rose-200",
        indigo: "group-hover:border-indigo-200",
        blue: "group-hover:border-blue-200",
        sky: "group-hover:border-sky-200",
        orange: "group-hover:border-orange-200",
        fuchsia: "group-hover:border-fuchsia-200",
    }[color] || "group-hover:border-blue-200";

    const textHoverClasses = {
        emerald: "group-hover:text-emerald-700",
        amber: "group-hover:text-amber-700",
        rose: "group-hover:text-rose-700",
        indigo: "group-hover:text-indigo-700",
        blue: "group-hover:text-blue-700",
        sky: "group-hover:text-sky-700",
        orange: "group-hover:text-orange-700",
        fuchsia: "group-hover:text-fuchsia-700",
    }[color] || "group-hover:text-blue-700";

    return (
        <Link
            to={`/categories/${encodeURIComponent(category)}`}
            className={`flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 ${borderHoverClasses}`}
        >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:text-white group-hover:rotate-6 ${colorClasses}`}>
                <Icon className="text-3xl" />
            </div>
            <h3 className={`font-bold text-gray-900 text-center text-sm md:text-lg leading-tight transition-colors duration-300 ${textHoverClasses}`}>
                {category}
            </h3>
            {definition.description && (
                <p className="mt-2 text-xs text-gray-400 text-center line-clamp-2 md:block hidden">
                    {definition.description}
                </p>
            )}
        </Link>
    );
};

export default CategoryCard;
