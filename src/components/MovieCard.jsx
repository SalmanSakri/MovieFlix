// components/MovieCard.js
import React from 'react';
import { Star } from 'lucide-react';
import LoadingSpinner from "../components/LoadingSpinner";
const MovieCard = ({ movies, onMovieClick, imageBaseUrl, loading, error }) => {

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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {
                    movies.map((movie) => (
                        <div
                            className="cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => onMovieClick(movie.id)}
                            key={movie.id}
                        >
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src={`${imageBaseUrl}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                                />

                                <div className="bottom-0 left-0 right-0 p-4 transition-opacity duration-300 text-center">
                                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                                        {movie.title}
                                    </h3>

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

        </>

    );
};

export default MovieCard;