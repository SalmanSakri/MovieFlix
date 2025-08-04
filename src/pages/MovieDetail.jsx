import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import MovieDetailsCard from "../components/MovieDetailsCard";
import useFetch from "../hook/fetchApi";
import { API_CONFIG } from "../utils/constants";


const MovieDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const url = `${API_CONFIG.BASE_URL}/movie/${id}?api_key=${API_CONFIG.API_KEY}&language=en-US`;
    // console.log(url);
    const { data, error, loading } = useFetch(url);

    // Function to navigate back to previous page
    const handleBack = () => {
        navigate(-1);
    };


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



                <MovieDetailsCard
                    movie={data}
                    imageBaseUrl={API_CONFIG.IMAGE_BASE_URL}
                    loading={loading}
                    error={error}
                />
            </div>

        </>
    );
};

export default MovieDetail;
