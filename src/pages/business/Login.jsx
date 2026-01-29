import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import nairobiImg from "../../assets/nairobi.jpg";

const Login = () => {
    const navigate = useNavigate();
    const { loginBusiness, hasBusiness } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { type, value } = e.target;
        setFormData(prev => ({ ...prev, [type === 'email' ? 'email' : 'password']: value }));
        setError("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const result = loginBusiness(formData.email, formData.password);

            if (result.success) {
                setIsLoading(false);
                // Redirect logic based on business state
                // This will also be handled by the route guard on mount, but good to do here too
                navigate(hasBusiness ? "/business/dashboard" : "/business/create");
            } else {
                setIsLoading(false);
                setError(result.message);

                // If no account, redirect to signup after a small delay
                if (result.type === 'no_account') {
                    setTimeout(() => {
                        navigate("/business/signup", { state: { email: formData.email } });
                    }, 2000);
                }
            }
        }, 800);
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${nairobiImg})` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Business Login
                </h2>
                <p className="text-sm text-gray-200 text-center mb-6">
                    Login to manage your business on Nairobiz
                </p>

                <div className="flex justify-center gap-6 text-sm mb-6">
                    <span className="font-semibold border-b-2 border-blue-400 pb-1">
                        Login
                    </span>
                    <Link to="/business/signup" className="text-gray-300 hover:text-white transition-colors text-blue-400">
                        Register
                    </Link>
                </div>

                {error && (
                    <div className={`p-3 rounded-lg text-sm mb-6 text-center animate-pulse ${error.includes('found') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        required
                        type="email"
                        placeholder="Business Email"
                        onChange={handleInputChange}
                        className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        required
                        type="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Logging in...' : 'Login →'}
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/business/signup" className="text-xs text-blue-300 hover:text-white underline decoration-blue-300/50">
                            Don't have an account? Create one for free
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
