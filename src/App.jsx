import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PublicRoute, OnboardingRoute, BusinessDashboardRoute } from "./components/auth/RouteGuards";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import BusinessProfile from "./pages/BusinessProfile";

// Auth pages
import Login from "./pages/business/Login";
import Signup from "./pages/business/Signup";
import AdminLogin from "./pages/admin/Login";

// Business app
import Dashboard from "./pages/business/Dashboard";
import BusinessProfileForm from "./pages/business/BusinessProfileForm";
import Verification from "./pages/business/Verification";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryName" element={<CategoryDetail />} />
          <Route path="/business/:id" element={<BusinessProfile />} />
          <Route path="/business/profile/:id" element={<BusinessProfile />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🔓 Public Auth Routes (Only accessible if logged out) */}
          <Route element={<PublicRoute />}>
            <Route path="/business/login" element={<Login />} />
            <Route path="/business/signup" element={<Signup />} />
          </Route>

          {/* 🔒 Onboarding Route (Logged in but no business) */}
          <Route element={<OnboardingRoute />}>
            <Route path="/business/create" element={<BusinessProfileForm mode="create" />} />
          </Route>

          {/* 🔒 Business Dashboard Routes (Logged in WITH business) */}
          <Route element={<BusinessDashboardRoute />}>
            <Route path="/business/dashboard" element={<Dashboard />} />
            <Route path="/business/edit" element={<BusinessProfileForm mode="edit" />} />
            <Route path="/business/verification" element={<Verification />} />
            {/* Demo profile link from dashboard */}
            <Route path="/business/profile/demo" element={<BusinessProfile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
