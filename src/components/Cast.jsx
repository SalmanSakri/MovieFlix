import LoadingSpinner from "./LoadingSpinner"
import { API_CONFIG } from "../utils/constants"
import useFetch from '../hook/fetchApi'
import { useParams } from 'react-router-dom'

const Cast = () => {
    const { id } = useParams(); // Fixed: Added parentheses
    const url = `${API_CONFIG.BASE_URL}/movie/${id}/credits?api_key=${API_CONFIG.API_KEY}&language=en-US`;

    const { data: credits, error, loading } = useFetch(url);

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
    if (!credits?.cast || credits.cast.length === 0) {
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
                {credits.cast.slice(0, 12).map((actor) => ( // Show only first 12 cast members
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
        </>
    )
}

export default Cast