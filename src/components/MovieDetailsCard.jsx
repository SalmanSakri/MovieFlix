import { Star, Calendar, Play, Users } from "lucide-react";
import Cast from "../components/Cast";
import LoadingSpinner from './LoadingSpinner';


const MovieDetailsCard = ({ movie, imageBaseUrl, loading, error }) => {

    // Handle loading state
    if (loading) { return (<><LoadingSpinner /></>); }

    // Handle error state
    if (error) {
        return (
            <div className="text-red-400 text-center py-4">
                Error loading information
            </div>
        );
    }

    return (
        <>
            <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl overflow-hidden border border-white/30">

                {/* Movie Information Section */}
                <div className="flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Movie Poster */}
                        <div className="flex-shrink-0 self-center md:self-start">
                            <img
                                src={`${imageBaseUrl}${movie.poster_path}`}
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
                        src={`${imageBaseUrl}${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-full object-fill rounded-r-2xl"
                    />
                </div>
            </div>


            {/* Cast Section */}
            <div className="mt-12">
                {/* Cast Section Header */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
                    <Users size={24} className="mr-2" />
                    Cast
                </h3>
                <Cast />
            </div>

        </>
    )
}

export default MovieDetailsCard