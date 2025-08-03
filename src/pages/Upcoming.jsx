import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { API_CONFIG, API_ENDPOINTS } from "../utils/constants";
import useFetch from "../hook/fetchApi";
const Upcoming = () => {
  const navigate = useNavigate();
  const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.UPCOMING}?api_key=${API_CONFIG.API_KEY}&language=en-US&page=1`;

  const { data, error, loading } = useFetch(url);
  // Handle loading state
  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-red-400 text-center py-4">
        Error loading information
      </div>
    );
  }
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6">

        <h1 className="text-2xl font-bold text-white mb-4">Upcoming Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((movie) => (
            <div
              className="cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* Movie Poster Image */}
                <img
                  src={`${API_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Movie Information Overlay */}
                <div className="bottom-0 left-0 right-0 p-4 transition-opacity duration-300 text-center">
                  {/* Movie Title */}
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {movie.title}
                  </h3>

                  {/* Rating Display */}
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-300">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span>Rating: {movie.vote_average?.toFixed(1)}</span>
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

export default Upcoming;
