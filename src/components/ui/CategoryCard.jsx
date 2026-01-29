// src/components/ui/CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaUtensils, FaSpa, FaPalette, FaBriefcase, FaCoffee, FaHome,
    FaMedkit, FaBreadSlice, FaDrumstickBite, FaWineBottle, FaBook, FaPencilAlt
} from 'react-icons/fa';

const iconMap = {
    "Pharmacy & Health Stores": FaMedkit,
    "Bakeries": FaBreadSlice,
    "Butcheries": FaDrumstickBite,
    "Wine & Beverage Shops": FaWineBottle,
    "Bookshops": FaBook,
    "Stationery & Office Supplies": FaPencilAlt,
    "Restaurant": FaUtensils,
    "Beauty & Spa": FaSpa,
    "Designers": FaPalette,
    "Cafe": FaCoffee,
    "Real Estate": FaHome,
    "Services": FaBriefcase,
};

const CategoryCard = ({ category }) => {
    const Icon = iconMap[category] || FaBriefcase;

    return (
        <Link to={`/search?category=${category}`} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Icon className="text-xl" />
            </div>
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 text-center text-sm md:text-base leading-tight">{category}</h3>
        </Link>
    );
};

export default CategoryCard;
