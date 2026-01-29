import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import BusinessPrivateRoute from "./components/auth/BusinessPrivateRoute";

// Layouts
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
    <AuthProvider>
      <ScrollToTop />

      <Routes>
        {/* ✅ All pages now have Navbar & Footer as requested */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/business/:id" element={<BusinessProfile />} />

          {/* Public Auth Routes */}
          <Route path="/business/login" element={<Login />} />
          <Route path="/business/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🔒 Protected Business Routes */}
          <Route element={<BusinessPrivateRoute />}>
            <Route path="/business/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
