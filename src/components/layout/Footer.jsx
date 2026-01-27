// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
                            <span className="font-bold text-xl text-gray-900 tracking-tight">Nairobiz</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Connecting trusted businesses with new customers in Nairobi. Discover the best services around you.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors"><FaLinkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/search" className="hover:text-blue-600 transition-colors">Browse Businesses</Link></li>
                            <li><Link to="/categories" className="hover:text-blue-600 transition-colors">Categories</Link></li>
                            <li><Link to="#" className="hover:text-blue-600 transition-colors">List Your Business</Link></li>
                            <li><Link to="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                            <li><Link to="#" className="hover:text-blue-600 transition-colors">Safety Information</Link></li>
                            <li><Link to="#" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                            <li><Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Newsletter</h4>
                        <p className="text-gray-500 text-sm mb-4">Subscribe to our newsletter to get the latest updates.</p>
                        <form className="flex gap-2">
                            <input type="email" placeholder="Your email" className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">© 2024 Nairobiz. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link to="#" className="hover:text-gray-900">Privacy Policy</Link>
                        <Link to="#" className="hover:text-gray-900">Terms</Link>
                        <Link to="#" className="hover:text-gray-900">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
