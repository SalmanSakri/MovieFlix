import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Calendar, Play, Users } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Cast from "../components/Cast";
import useFetch from "../hook/fetchApi";
import { API_CONFIG } from "../utils/constants";


const MovieDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const url = `${API_CONFIG.BASE_URL}/movie/${id}?api_key=${API_CONFIG.API_KEY}&language=en-US`;
    // console.log(url);
    const { data: movie, error, loading } = useFetch(url);

    // Function to navigate back to previous page
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
                Error loading cast information
            </div>
        );
    }
    return (
        <>

            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={22} />
                    <span className="font-bold">Back</span>
                </button>


                <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl overflow-hidden border border-white/30">
                    {/* Movie Information Section */}
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Movie Poster */}
                            <div className="flex-shrink-0 self-center md:self-start">
                                <img
                                    src={`${API_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-44 h-auto object-cover rounded-xl shadow-lg"
                                />
                            </div>

                            {/* Movie Details */}
                            <div className="flex-1 mt-2 md:mt-0">
                                {/* Movie Title */}
                                <h1 className="text-2xl font-bold text-white mb-3">
                                    {movie.title}
                                </h1>

                                {/* Movie Metadata */}
                                <div className="text-gray-300 space-y-3 text-sm sm:text-base">
                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <Star
                                            size={20}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                        <span>Rating: {movie.vote_average?.toFixed(1)}/10</span>
                                    </div>

                                    {/* Release Date */}
                                    <div className="flex items-center gap-2">
                                        <Calendar size={20} />
                                        <span>
                                            {movie.release_date
                                                ? (() => {
                                                    // Format date as DD-MM-YYYY
                                                    const date = new Date(movie.release_date);
                                                    const day = date.getDate();
                                                    const month = (date.getMonth() + 1)
                                                        .toString()
                                                        .padStart(2, "0");
                                                    const year = date.getFullYear();
                                                    return `${day}-${month}-${year}`;
                                                })()
                                                : "N/A"}
                                        </span>
                                    </div>

                                    {/* Runtime (if available) */}
                                    {movie.runtime && (
                                        <div className="flex items-center gap-2">
                                            <Play size={20} />
                                            <span>{movie.runtime} min</span>
                                        </div>
                                    )}
                                </div>

                                {/* Movie Genres */}
                                {movie.genres?.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {movie.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="px-3 py-1 bg-white/10 text-purple-200 rounded-full text-xs sm:text-sm"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Movie Overview */}
                        <div className="mt-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                Overview
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                {movie.overview || "No overview available for this movie."}
                            </p>
                        </div>
                    </div>

                    {/* Backdrop Image */}
                    <div className="h-60 sm:h-80 md:h-full w-full">
                        <img
                            src={`${API_CONFIG.IMAGE_BASE_URL}${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-fill rounded-r-2xl"
                        />
                    </div>
                </div>


                {/* Cast Section - Only show if cast data exists */}
                <div className="mt-12">
                    {/* Cast Section Header */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
                        <Users size={24} className="mr-2" />
                        Cast
                    </h3>
                    <Cast />
                </div>

            </div>
        </>
    );
};

export default MovieDetail;
