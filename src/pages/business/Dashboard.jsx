import React, { useState } from "react";
import {
  FiLayout, FiBriefcase, FiUser, FiCheckCircle, FiLogOut,
  FiPlus, FiTrendingUp, FiMousePointer, FiEye, FiMenu, FiX,
  FiCheck, FiEdit3, FiExternalLink
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { logoutBusiness } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle this to show the "Existing Business" state
  const [hasBusiness, setHasBusiness] = useState(false);

  // Mock Business Data
  const businessData = {
    name: "Urban Roast Cafe",
    category: "Cafe",
    location: "Kileleshwa, Nairobi",
    status: "Verified",
    stats: [
      { label: "Profile Views", value: "1,284", icon: FiEye, color: "text-blue-600", bg: "bg-blue-50" },
      { label: "Contact Clicks", value: "342", icon: FiMousePointer, color: "text-green-600", bg: "bg-green-50" },
      { label: "Trust Score", value: "98%", icon: FiTrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
    ]
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: FiLayout, active: true },
    { name: "My Business", icon: FiBriefcase, active: false },
    { name: "Edit Profile", icon: FiEdit3, active: false },
    { name: "Verification", icon: FiCheckCircle, active: false },
  ];

  const onboardingSteps = [
    { title: "Add business details", completed: true },
    { title: "Add services & pricing", completed: false },
    { title: "Add contact information", completed: false },
    { title: "Submit for verification", completed: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 max-w-[1600px] mx-auto">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
        <div className="h-full flex flex-col pt-20 md:pt-6">
          <div className="px-6 mb-8 flex justify-between items-center md:hidden">
            <span className="font-bold text-xl text-blue-600">Nairobiz</span>
            <button onClick={() => setIsSidebarOpen(false)}>
              <FiX className="text-2xl" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                                    ${link.active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-gray-500 hover:bg-gray-100"}
                                `}
              >
                <link.icon size={20} />
                {link.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={logoutBusiness}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all"
            >
              <FiLogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header Toggle */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-100 rounded-lg">
            <FiMenu size={24} />
          </button>
          <span className="font-bold">Business Hub</span>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            U
          </div>
        </div>

        <div className="p-6 md:p-10">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 block">
                Good Morning, {hasBusiness ? "Urban Roast" : "Entrepreneur"}!
              </h1>
              <p className="text-gray-500 mt-1">
                {hasBusiness
                  ? "Here's what's happening with your business listing today."
                  : "Let's get your business listed and visible to thousands of customers."}
              </p>
            </div>
            {!hasBusiness && (
              <button
                onClick={() => setHasBusiness(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg active:scale-95"
              >
                <FiPlus /> Create Business Profile
              </button>
            )}
            {hasBusiness && (
              <div className="flex gap-3">
                <button
                  onClick={() => setHasBusiness(false)}
                  className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Switch to Empty State
                </button>
                <Link to="/business/demo" className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
                  <FiExternalLink /> Preview Page
                </Link>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {(hasBusiness ? businessData.stats : [
              { label: "Total Views", value: "0", icon: FiEye, color: "text-gray-400", bg: "bg-gray-100" },
              { label: "Contact Requests", value: "0", icon: FiMousePointer, color: "text-gray-400", bg: "bg-gray-100" },
              { label: "Verification Status", value: "Not Started", icon: FiCheckCircle, color: "text-gray-400", bg: "bg-gray-100" },
            ]).map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Section: Conditional Content */}
          {!hasBusiness ? (
            /* State A: New Business Owner */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <FiPlus size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Create your business profile</h3>
                <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                  Stand out to customers in Nairobi. Add your location, services, and photos to get started.
                </p>
                <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95">
                  Get Started Now
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Onboarding Checklist</h3>
                <div className="space-y-6">
                  {onboardingSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`
                                                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                                ${step.completed ? "bg-green-500 text-white" : "border-2 border-gray-200 text-gray-300"}
                                            `}>
                        {step.completed ? <FiCheck /> : <span className="text-xs">{i + 1}</span>}
                      </div>
                      <span className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-400"}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-sm text-amber-800">
                    <strong>Tip:</strong> Businesses with complete profiles receive 5x more clicks and engagement.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* State B: Existing Business Owner */
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=200&auto=format&fit=crop"
                        alt="Business"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-gray-900">{businessData.name}</h3>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
                          <FiCheckCircle /> Verified
                        </span>
                      </div>
                      <p className="text-gray-500 mb-4">{businessData.category} • {businessData.location}</p>
                      <div className="flex flex-wrap gap-3">
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 flex items-center gap-2">
                          <FiEdit3 /> Edit Profile
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 shadow-sm active:scale-95">
                          Promote Business
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:border-l border-gray-100 md:pl-8 flex flex-col justify-center">
                    <div className="text-sm text-gray-500 mb-1">Public Verification Status</div>
                    <div className="flex items-center gap-2 text-green-600 font-bold text-lg mb-4">
                      <FiCheckCircle /> Business Verified
                    </div>
                    <button className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1">
                      View Verification Badge Details →
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-6 text-gray-500">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                      <span>New review from "John Doe"</span>
                      <span className="text-xs">2h ago</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                      <span>Clicked WhatsApp 3 times</span>
                      <span className="text-xs">5h ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Profile photo updated</span>
                      <span className="text-xs">Yesterday</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl text-white shadow-xl shadow-blue-100">
                  <h3 className="text-xl font-bold mb-4">Reach More Customers</h3>
                  <p className="text-blue-100 mb-8 leading-relaxed font-light">
                    Upgrade to Nairobiz Premium to appear at the top of search results and get featured on the home page.
                  </p>
                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all active:scale-95">
                    View Pricing Plans
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
