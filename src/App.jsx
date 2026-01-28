import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Categories from "./pages/Categories";
import BusinessProfile from "./pages/BusinessProfile";

// Auth pages
import Login from "./pages/business/Login";
import Signup from "./pages/business/Signup";
import AdminLogin from "./pages/admin/Login";

// Business app
import Dashboard from "./pages/business/Dashboard";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ❌ NO navbar & footer */}
        <Route element={<AuthLayout />}>
          <Route path="/business/login" element={<Login />} />
          <Route path="/business/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* ✅ Navbar & footer on ALL other pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/business/:id" element={<BusinessProfile />} />
          <Route path="/business/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
