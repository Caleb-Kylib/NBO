import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus, FiEye, FiMousePointer, FiCheckCircle, FiEdit3, FiArrowRight, FiSmartphone } from "react-icons/fi";
import BusinessLayout from "../../layouts/BusinessLayout";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { businessData, hasBusiness } = useAuth();

  // Simplified Mock Stats
  const stats = [
    { label: "Profile Views", value: hasBusiness ? "1.2k" : "0", icon: FiEye, color: "text-blue-600" },
    { label: "Contact Clicks", value: hasBusiness ? "342" : "0", icon: FiMousePointer, color: "text-emerald-600" },
    { label: "Profile Completion", value: hasBusiness ? "85%" : "0%", icon: FiSmartphone, color: "text-amber-600" },
  ];

  return (
    <BusinessLayout>
      <div className="p-6 md:p-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-500">
              Welcome to your business hub.
            </p>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-0.5">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!hasBusiness ? (
          /* State A: New Business Owner */
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">You haven't created a business profile yet</h2>
            <Link
              to="/business/create"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all"
            >
              <FiPlus size={22} />
              Create Business Profile
            </Link>
          </div>
        ) : (
          /* State B: Existing Business Owner */
          <div className="space-y-6">
            {/* Business Card Summary */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 font-bold text-3xl">
                  {(businessData?.name || "UR").substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h2 className="text-2xl font-bold text-slate-900">{businessData?.name}</h2>
                    <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-100 uppercase">
                      Pending Verification
                    </span>
                  </div>
                  <p className="text-slate-500">{businessData?.category} • {businessData?.location}</p>
                  <p className="text-sm text-slate-400 mt-1">{businessData?.phone} • {businessData?.whatsapp}</p>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Link
                  to="/business/edit"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  <FiEdit3 size={20} />
                  Edit Profile
                </Link>
                <Link
                  to="/business/profile/demo"
                  className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all"
                >
                  <FiArrowRight size={24} />
                </Link>
              </div>
            </div>

            {/* Verification Nudge */}
            <div className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl shadow-blue-200">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Build more trust with customers</h3>
                <p className="text-slate-400 max-w-sm">Verified businesses get 3x more contact requests and better search visibility.</p>
              </div>
              <Link to="/business/verification" className="relative z-10 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all">
                Start Verification
              </Link>
            </div>
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};

export default Dashboard;
