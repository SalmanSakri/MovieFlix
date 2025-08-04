import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useSearch } from "../context/SearchContext";

const SearchBar = () => {
    const { query, setQuery, setPreviousRoute } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        if (searchTimeout) clearTimeout(searchTimeout);

        const trimmedQuery = query.trim().toLowerCase();
        const isOnMovieDetail = location.pathname.startsWith("/movie/");
        const isOnSearch = location.pathname.startsWith("/search");

        if (!trimmedQuery || trimmedQuery === "back") {
            if (isOnSearch) navigate("/");
            return;
        }

        if (isOnMovieDetail) return;

        const timeout = setTimeout(() => {
            if (!isOnSearch) {
                setPreviousRoute(location.pathname);
            }
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        }, 500);

        setSearchTimeout(timeout);
        return () => clearTimeout(timeout);
    }, [query, location.pathname]);

    const handleSearchKey = (e) => {
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
        <div className="relative flex-1 max-w-md mx-4">
            <input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKey}
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
    );
};

export default SearchBar;
