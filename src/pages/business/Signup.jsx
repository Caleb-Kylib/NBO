import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import nairobiImg from "../../assets/nairobi.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const { loginBusiness } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      loginBusiness();
      setIsLoading(false);
      navigate("/business/dashboard");
    }, 1200);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${nairobiImg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-2">Register Your Business</h2>
        <p className="text-sm text-gray-200 text-center mb-6">
          Join Nairobiz to reach thousands of local customers.
        </p>

        <div className="flex justify-center gap-6 text-sm mb-6">
          <Link to="/business/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <span className="font-semibold border-b-2 border-green-400 pb-1">
            Register
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            required
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Business Name"
          />
          <input
            required
            type="email"
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Business Email"
          />
          <input
            required
            type="tel"
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Phone Number"
          />
          <input
            required
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Create Password"
          />

          <p className="text-xs text-gray-300 text-center px-2">
            By clicking "Create Account", you agree to our terms and conditions.
          </p>

          <button
            disabled={isLoading}
            className={`w-full bg-green-500 text-black py-3 rounded-md font-semibold hover:bg-green-600 transition flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
