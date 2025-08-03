import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Star, ArrowLeft } from 'lucide-react';
import { API_CONFIG, API_ENDPOINTS } from "../utils/constants"
import useFetch from '../hook/fetchApi';
import LoadingSpinner from './LoadingSpinner';

const SearchResults = () => {
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get search query from URL
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');

    // Construct search URL if query exists
    const searchUrl = searchQuery?.trim()
        ? `${API_CONFIG.BASE_URL}/search/movie?api_key=${API_CONFIG.API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}`
        : null;
    // Use custom fetch hook
    const { data, loading, error } = useFetch(searchUrl);

    useEffect(() => {
        setHasSearched(!!searchQuery?.trim());
    }, [searchQuery]);

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Handle loading state
    if (loading) {
        return (
            <div className="px-2 py-2">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <LoadingSpinner />
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="text-red-400 text-center py-4">
                Error loading information
                   <LoadingSpinner />
            </div>
        );
    }



    return (

        <>
            <Navbar />
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={22} />
                    <span className="font-bold">Back</span>
                </button>



                <h2 className="text-white text-xl mb-4">Search Results for: {searchQuery}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {
                        data.map((movie) => (
                            <div
                                key={movie.id}
                                className="cursor-pointer transform transition-all duration-300 hover:scale-105"
                                onClick={() => handleMovieClick(movie.id)}
                            >
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={`${API_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="p-4 text-center">
                                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-300">
                                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                            <span>Rating: {movie.vote_average?.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>

    );
};

export default SearchResults;

