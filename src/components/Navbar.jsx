import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

// Navigation links
const NAV_LINKS = [
  { label: "Popular", to: "/" },
  { label: "Top Rated", to: "/top-rated" },
  { label: "Upcoming", to: "/upcoming" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current route

  // Close mobile menu when a link is clicked
  const handleNavigation = () => setMobileMenuOpen(false);

  // Render navigation links with active class
  const renderLinks = (className = "") => {
    return NAV_LINKS.map(({ label, to }) => {
      const isActive = location.pathname === to;

      return (
        <Link
          key={to}
          to={to}
          onClick={handleNavigation}
          className={`px-3 py-2 font-medium rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-gradient-to-r from-purple-400 to-pink-400 text-black"
              : "text-white hover:text-black hover:bg-white/30"
          } ${className}`}
        >
          {label}
        </Link>
      );
    });
  };

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MovieFlix
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-5 ml-5">
            {renderLinks()}
          </nav>

          {/* Search */}
          <SearchBar />

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {renderLinks("text-left")}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
