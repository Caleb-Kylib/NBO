import React from "react";
import { Link } from "react-router-dom";
import nairobiImg from "../../assets/nairobi.jpg";

const Login = () => {
  return (
    <div
      className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${nairobiImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Business Dashboard
        </h2>
        <p className="text-sm text-gray-200 text-center mb-6">
          Login to manage your business on Nairobiz
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-6 text-sm mb-6">
          <span className="font-semibold border-b-2 border-green-400 pb-1">
            Login
          </span>
          <Link to="/business/signup" className="text-gray-300 hover:text-white">
            Register
          </Link>
          <span className="text-gray-400">Reset Password</span>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Business Email or Username"
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded bg-white/20" />
              Remember me
            </label>
            <Link to="#" className="hover:text-green-400">
              Forgot password?
            </Link>
          </div>

          <button className="w-full bg-green-500 text-black py-3 rounded-md font-semibold hover:bg-green-600 transition">
            Login →
          </button>
        </form>

        {/* Social */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Connect with Social Networks
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
