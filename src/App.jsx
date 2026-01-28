// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Categories from './pages/Categories';
import BusinessProfile from './pages/BusinessProfile';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from "./pages/business/Login";
import Signup from "./pages/business/Signup";
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
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/business/:id" element={<BusinessProfile />} />
          <Route path="/business/login" element={<Login />} />
          <Route path="/business/signup" element={<Signup />} />
          <Route path="/business/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
