import {
    FaUtensils, FaSpa, FaPalette, FaBriefcase, FaCoffee, FaHome,
    FaMedkit, FaBreadSlice, FaDrumstickBite, FaWineBottle, FaBook, FaPencilAlt
} from 'react-icons/fa';

export const categoryDefinitions = [
    {
        name: "Pharmacy & Health Stores",
        icon: FaMedkit,
        color: "emerald",
        description: "Medicines, wellness products, and health consultations."
    },
    {
        name: "Bakeries",
        icon: FaBreadSlice,
        color: "amber",
        description: "Freshly baked bread, pastries, and custom cakes."
    },
    {
        name: "Butcheries",
        icon: FaDrumstickBite,
        color: "rose",
        description: "Premium quality meats and gourmet cuts."
    },
    {
        name: "Wine & Beverage Shops",
        icon: FaWineBottle,
        color: "indigo",
        description: "Fine wines, spirits, and curated beverages."
    },
    {
        name: "Bookshops",
        icon: FaBook,
        color: "blue",
        description: "Wide collection of books, educational materials, and literature."
    },
    {
        name: "Stationery & Office Supplies",
        icon: FaPencilAlt,
        color: "sky",
        description: "Office equipment, school supplies, and creative materials."
    },
    {
        name: "Restaurant",
        icon: FaUtensils,
        color: "orange",
        description: "Local and international cuisines for every palate."
    },
    {
        name: "Beauty & Spa",
        icon: FaSpa,
        color: "fuchsia",
        description: "Hair styling, massage, and therapeutic wellness."
    }
];
