import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner"
import { API_CONFIG } from "../utils/constants"
import useFetch from '../hook/fetchApi'
import Pagination from "../components/Pagination"
import { useParams } from 'react-router-dom'

const Cast = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const castPerPage = 6;
    const url = `${API_CONFIG.BASE_URL}/movie/${id}/credits?api_key=${API_CONFIG.API_KEY}&language=en-US`;

    const { data, error, loading } = useFetch(url);

    const cast = data?.cast || [];

    // Calculate total pages
    const totalPages = Math.ceil(cast.length / castPerPage);

    // Slice cast for current page
    const getCurrentCast = () => {
        const startIndex = (currentPage - 1) * castPerPage;
        return cast.slice(startIndex, startIndex + castPerPage);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ behavior: 'smooth' });
    };



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
                Error loading cast information
            </div>
        );
    }

    // Handle case where no cast data is available
    if (!data?.cast || data.cast.length === 0) {
        return (
            <div className="text-gray-400 text-center py-4">
                No cast information available
            </div>
        );
    }

    return (
        <>
            {/* Cast Grid - Responsive grid for cast members */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {getCurrentCast().map((actor) => ( // Show only first 12 cast members
                    <div key={actor.id} className="">
                        {/* Actor profile image */}
                        <img
                            src={`${API_CONFIG.IMAGE_BASE_URL}${actor.profile_path}`}
                            alt={actor.name}
                            className="object-cover rounded-xl mb-2"
                        />
                        {/* Actor name */}
                        <p className="text-white text-sm font-medium truncate" title={actor.name}>
                            {actor.name}
                        </p>
                        {/* Character name */}
                        <p className="text-gray-300 text-xs" title={actor.character}>
                            character: {actor.character}
                        </p>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}

            />
        </>
    )
}

export default Cast