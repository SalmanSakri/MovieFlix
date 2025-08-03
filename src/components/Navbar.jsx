// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { useSearch } from "../context/SearchContext";

// const Navbar = () => {
//   const { query, setQuery, setPreviousRoute } = useSearch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   const handleNavigation = () => {
//     setMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }

//     const trimmedQuery = query.trim().toLowerCase();

//     if (!trimmedQuery || trimmedQuery === "back") {
//       // If query is empty or 'back', reset to previous or home
//       if (location.pathname.startsWith("/search")) {
//         navigate("/"); // Go home from search
//       }
//       return;
//     }

//     // Debounced auto search
//     const timeout = setTimeout(() => {
//       if (!location.pathname.startsWith("/search")) {
//         setPreviousRoute(location.pathname); // Save current before search
//       }
//       navigate(`/search?q=${encodeURIComponent(query)}`);
//     }, 500);

//     setSearchTimeout(timeout);

//     return () => clearTimeout(timeout);
//   }, [query]);

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && query.trim() !== "") {
//       if (searchTimeout) clearTimeout(searchTimeout);
//       if (!location.pathname.startsWith("/search")) {
//         setPreviousRoute(location.pathname);
//       }
//       navigate(`/search?q=${encodeURIComponent(query)}`);
//     }
//   };

//   const clearSearch = () => {
//     setQuery("");
//     if (location.pathname.startsWith("/search")) {
//       navigate("/");
//     }
//   };

//   return (
//     <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Brand Logo */}
//           <Link to="/" className="flex items-center space-x-4">
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               MovieFlix
//             </h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <Link
//               to="/"
//               className="px-3 py-2 font-medium text-white rounded-lg transition-all duration-200 hover:text-black hover:bg-white/30"
//             >
//               Popular
//             </Link>
//             <Link
//               to="/top-rated"
//               className="px-3 py-2 font-medium text-white rounded-lg transition-all duration-200 hover:text-black hover:bg-white/30"
//             >
//               Top Rated
//             </Link>
//             <Link
//               to="/upcoming"
//               className="px-3 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:text-black hover:bg-white/30"
//             >
//               Upcoming
//             </Link>
//           </nav>

//           {/* Search Bar */}
//           <div className="relative flex-1 max-w-md mx-4">
//             <input
//               type="text"
//               placeholder="Search for movies..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               onKeyDown={handleSearch}
//               className="w-full pl-4 pr-10 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//             />
//             {query && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             )}
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             className="md:hidden text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-white/10">
//             <div className="flex flex-col space-y-2">
//               <Link
//                 to="/"
//                 onClick={handleNavigation}
//                 className="px-3 py-2 text-white rounded-lg text-left transition-all duration-200 hover:bg-white/10"
//               >
//                 Popular
//               </Link>
//               <Link
//                 to="/top-rated"
//                 onClick={handleNavigation}
//                 className="px-3 py-2 text-white rounded-lg text-left transition-all duration-200 hover:bg-white/10"
//               >
//                 Top Rated
//               </Link>
//               <Link
//                 to="/upcoming"
//                 onClick={handleNavigation}
//                 className="px-3 py-2 text-white rounded-lg text-left transition-all duration-200 hover:bg-white/10"
//               >
//                 Upcoming
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;



import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";

const Navbar = () => {
  const { query, setQuery, setPreviousRoute } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleNavigation = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery || trimmedQuery === "back") {
      // If query is empty or 'back', reset to previous or home
      if (location.pathname.startsWith("/search")) {
        navigate("/"); // Go home from search
      }
      return;
    }

    // Only trigger auto-search if we're not on a movie detail page or already on search
    const isOnMovieDetail = location.pathname.startsWith("/movie/");
    const isOnSearch = location.pathname.startsWith("/search");
    
    // Don't auto-navigate if we're on a movie detail page
    if (isOnMovieDetail) {
      return;
    }

    // Debounced auto search
    const timeout = setTimeout(() => {
      if (!isOnSearch) {
        setPreviousRoute(location.pathname); // Save current before search
      }
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }, 500);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [query, location.pathname]); // Added location.pathname to dependencies

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      if (searchTimeout) clearTimeout(searchTimeout);
      if (!location.pathname.startsWith("/search")) {
        setPreviousRoute(location.pathname);
      }
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (location.pathname.startsWith("/search")) {
      navigate("/");
    }
  };

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MovieFlix
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="px-3 py-2 font-medium text-white rounded-lg transition-all duration-200 hover:text-black hover:bg-white/30"
            >
              Popular
            </Link>
            <Link
              to="/top-rated"
              className="px-3 py-2 font-medium text-white rounded-lg transition-all duration-200 hover:text-black hover:bg-white/30"
            >
              Top Rated
            </Link>
            <Link
              to="/upcoming"
              className="px-3 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:text-black hover:bg-white/30"
            >
              Upcoming
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-4 pr-10 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={handleNavigation}
                className="px-3 py-2 text-white rounded-lg text-left transition-all duration-200 hover:bg-white/10"
              >
                Popular
              </Link>
              <Link
                to="/top-rated"
                onClick={handleNavigation}
                className="px-3 py-2 text-white rounded-lg text-left transition-all duration-200 hover:bg-white/10"
              >
                Top Rated
              </Link>
              <Link
                to="/upcoming"
                onClick={handleNavigation}
                className="px-3 py-2 text-white rounded-lg text-left transition-all duration-200 hover:bg-white/10"
              >
                Upcoming
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;