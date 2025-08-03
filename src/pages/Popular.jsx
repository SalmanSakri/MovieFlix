import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import { API_CONFIG, API_ENDPOINTS } from "../utils/constants";
import { Star } from 'lucide-react';
import useFetch from "../hook/fetchApi";

const Popular = () => {
    const navigate = useNavigate();

    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POPULAR}?api_key=${API_CONFIG.API_KEY}&language=en-US&page=1`;

    const { data, error, loading } = useFetch(url);

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    // Handle loading state
    if (loading) {
        return (
            <>
                <Navbar />
                <LoadingSpinner />
            </>
        );
    }

    // Handle error state
    if (error) {
        return (
            <>
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6">
                    <div className="text-red-400 text-center py-4">
                        Error loading information: {error}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6">
                <h1 className="text-2xl font-bold text-white mb-4">Popular Movies</h1>

                {data && data.length === 0 && (
                    <div className="text-gray-300 text-center py-8">
                        No popular movies found.
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {data && data.map((movie) => (
                        <div
                            key={movie.id}
                            className="cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <div className="relative overflow-hidden rounded-2xl">
                                {/* Movie Poster Image */}
                                <img
                                    src={
                                        movie.poster_path
                                            ? `${API_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`
                                            : '/placeholder-image.jpg' // You should add a placeholder image
                                    }
                                    alt={movie.title}
                                    className="w-full h-64 sm:h-80 object-cover hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-image.jpg'; // Fallback for broken images
                                    }}
                                />

                                {/* Movie Information Overlay */}
                                <div className="p-4 transition-opacity duration-400 text-center">
                                    {/* Movie Title */}
                                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                                        {movie.title}
                                    </h3>

                                    {/* Rating Display */}
                                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-300">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        <span>Rating: {movie.vote_average?.toFixed(1) || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Popular;