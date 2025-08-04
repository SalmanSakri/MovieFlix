import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import MovieCard from '../components/MovieCard';
import Pagination from "../components/Pagination";
import { API_CONFIG, API_ENDPOINTS } from "../utils/constants";
import useFetch from "../hook/fetchApi";

const TopRated = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.TOP_RATED}?api_key=${API_CONFIG.API_KEY}&language=en-US&page=1`;
  const { data, error, loading } = useFetch(url);

  // Safely access movie results
  const movies = data || [];

  // Calculate total pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Get movies for current page
  const getCurrentMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    return movies.slice(startIndex, startIndex + moviesPerPage);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Optional: Scroll to top when changing pages
    window.scrollTo({ behavior: 'smooth' });
  };

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6">
        <h1 className="text-2xl font-bold text-white mb-4">Top Rated Movies</h1>

        <MovieCard
          movies={getCurrentMovies()}
          onMovieClick={handleMovieClick}
          imageBaseUrl={API_CONFIG.IMAGE_BASE_URL}
          loading={loading}
          error={error}
        />

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TopRated;