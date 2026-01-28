import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Register Your Business</h2>

        <form className="space-y-4">
          <input className="w-full border px-4 py-3 rounded-md" placeholder="Business Name" />
          <input className="w-full border px-4 py-3 rounded-md" placeholder="Email" />
          <input className="w-full border px-4 py-3 rounded-md" placeholder="Phone" />
          <input className="w-full border px-4 py-3 rounded-md" type="password" placeholder="Password" />

          <button className="w-full bg-green-700 text-white py-3 rounded-md font-semibold">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/business/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
