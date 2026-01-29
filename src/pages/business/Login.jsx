import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import nairobiImg from "../../assets/nairobi.jpg";

const Login = () => {
    const navigate = useNavigate();
    const { loginBusiness } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            loginBusiness();
            setIsLoading(false);
            navigate("/business/dashboard");
        }, 1000);
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
                    <span className="font-semibold border-b-2 border-green-400 pb-1">
                        Login
                    </span>
                    <Link to="/business/signup" className="text-gray-300 hover:text-white transition-colors">
                        Register
                    </Link>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        required
                        type="email"
                        placeholder="Business Email"
                        className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        required
                        type="password"
                        placeholder="Password"
                        className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <div className="flex items-center justify-between text-sm text-gray-300">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded bg-white/20" />
                            Remember me
                        </label>
                        <Link to="#" className="hover:text-green-400 transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        disabled={isLoading}
                        className={`w-full bg-green-500 text-black py-3 rounded-md font-semibold hover:bg-green-600 transition flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Logging in...' : 'Login →'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
