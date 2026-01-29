import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus, FiEye, FiMousePointer, FiCheckCircle, FiEdit3, FiArrowRight, FiSmartphone, FiLoader } from "react-icons/fi";
import BusinessLayout from "../../layouts/BusinessLayout";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, businessData, hasBusiness, isLoading, logoutBusiness } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/business/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <BusinessLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-12">
          <FiLoader className="animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-slate-500 font-medium font-display text-xl">Loading your business hub...</p>
        </div>
      </BusinessLayout>
    );
  }

  if (!user) return null;

  // Simplified Mock Stats
  const stats = [
    { label: "Profile Views", value: hasBusiness ? "1.2k" : "0", icon: FiEye, color: "text-blue-600" },
    { label: "Contact Clicks", value: hasBusiness ? "342" : "0", icon: FiMousePointer, color: "text-emerald-600" },
    { label: "Profile Completion", value: hasBusiness ? "85%" : "0%", icon: FiSmartphone, color: "text-amber-600" },
  ];

  return (
    <BusinessLayout>
      <div className="p-6 md:p-12 max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Business Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              Manage your presence on Nairobiz
            </p>
          </div>
          <button
            onClick={logoutBusiness}
            className="text-xs font-bold text-rose-500 hover:text-rose-600 uppercase tracking-widest bg-rose-50 px-4 py-2 rounded-lg"
          >
            Sign Out
          </button>
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
                  <p className="text-sm font-bold text-slate-400 mb-0.5">{stat.label}</p>
                  <p className="text-xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!hasBusiness ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
            <div className="relative z-10 max-w-lg mx-auto">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 text-blue-600 transform group-hover:rotate-6 transition-transform">
                <FiPlus size={40} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Ready to launch?</h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                Create your professional profile today and reach thousands of customers in Nairobi.
              </p>
              <Link
                to="/business/create"
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 text-lg"
              >
                <FiPlus size={22} />
                Build My Profiler
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Business Summary Card */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex items-center gap-8">
                <div className="w-32 h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center text-blue-600 font-black text-4xl overflow-hidden shadow-inner border-4 border-white ring-1 ring-slate-100">
                  {businessData?.image ? (
                    <img src={businessData.image} alt={businessData.name} className="w-full h-full object-cover" />
                  ) : (
                    (businessData?.name || "UR").substring(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{businessData?.name}</h2>
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${businessData?.verified
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                      {businessData?.verified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 font-medium">
                    <span>{businessData?.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{businessData?.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {businessData?.services?.slice(0, 4).map((service, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg font-bold uppercase tracking-tight">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link
                  to="/business/edit"
                  className="flex-grow inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                >
                  <FiEdit3 size={20} />
                  Edit Profile
                </Link>
                <Link
                  to={`/business/profile/${businessData?.id}`}
                  className="flex-shrink-0 w-14 h-14 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center shadow-sm"
                  title="View Public Profile"
                >
                  <FiArrowRight size={28} />
                </Link>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Profile Description</h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium italic bg-slate-50 p-6 rounded-2xl border border-slate-100">
                "{businessData?.description || 'No description provided yet.'}"
              </p>
            </div>

            {/* Verification Banner */}
            {!businessData?.verified && (
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl shadow-blue-200">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                <div className="relative z-10 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                    <FiCheckCircle /> Verification Needed
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tight leading-tight">Unlock Your Full <br /> Business Potential</h3>
                  <p className="text-blue-100 text-lg max-w-md font-medium">Verified businesses get <span className="text-white font-black">3x more traffic</span> and appear higher in search results. Build trust in seconds.</p>
                </div>
                <Link to="/business/verification" className="relative z-10 bg-white text-blue-600 px-12 py-5 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 text-lg">
                  Get Verified Now
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};

export default Dashboard;
