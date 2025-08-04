import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { API_CONFIG } from "../utils/constants"
import useFetch from '../hook/fetchApi';
import Pagination from '../components/Pagination';

const SearchResults = () => {
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 8;
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
    // console.log("serach data",data)


    useEffect(() => {
        setHasSearched(!!searchQuery?.trim());
    }, [searchQuery]);

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Safely access movie results
    const movies = data || [];

    // Calculate total pages
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // Get movies for current page
    const getCurrentMovies = () => {
        const startIndex = (currentPage - 1) * moviesPerPage;
        return movies.slice(startIndex, startIndex + moviesPerPage);
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
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={22} />
                    <span className="font-bold">Back</span>
                </button>

                <h2 className="text-white text-xl mb-4">Search Results for: {searchQuery}</h2>
                <MovieCard
                    movies={getCurrentMovies()}
                    onMovieClick={handleMovieClick}
                    imageBaseUrl={API_CONFIG.IMAGE_BASE_URL}
                    loading={loading}
                    error={error}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

            </div>
        </>

    );
};

export default SearchResults;

