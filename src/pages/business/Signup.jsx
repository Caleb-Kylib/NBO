import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import nairobiImg from "../../assets/nairobi.jpg";
import SuccessModal from "../../components/ui/SuccessModal";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerBusiness, loginBusiness } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    businessName: "",
    email: location.state?.email || "",
    password: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const result = registerBusiness(formData.email, formData.password, formData.businessName);

      if (result.success) {
        // Automatically login after signup
        loginBusiness(formData.email, formData.password);
        setIsLoading(false);
        setShowSuccess(true);
      } else {
        setIsLoading(false);
        setError(result.message);
      }
    }, 1200);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${nairobiImg})` }}
    >
      <SuccessModal
        isOpen={showSuccess}
        title="Account Created!"
        message="✅ Your account at Nairobiz is ready. Now, let's build your professional business profile."
        primaryAction={{
          label: "Create Business Profile",
          path: "/business/create"
        }}
        secondaryAction={{
          label: "Go to Dashboard",
          path: "/business/dashboard"
        }}
        autoRedirectDelay={3000}
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-2">Register Your Business</h2>
        <p className="text-sm text-gray-200 text-center mb-6">
          Be found by thousands of customers in Nairobi.
        </p>

        <div className="flex justify-center gap-6 text-sm mb-6">
          <Link to="/business/login" className="text-blue-400 hover:text-white transition-colors">
            Login
          </Link>
          <span className="font-semibold border-b-2 border-blue-600 pb-1">
            Register
          </span>
        </div>

        {error && (
          <div className="bg-rose-500/20 border border-rose-500/30 text-rose-300 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            required
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Business Name"
          />
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Business Email"
          />
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Phone Number"
          />
          <input
            required
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            placeholder="Create Password"
          />

          <p className="text-xs text-gray-300 text-center px-2">
            By creating an account, you agree to our Terms of Service.
          </p>

          <button
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
