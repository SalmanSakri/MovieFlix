export const API_CONFIG = {
    API_KEY: import.meta.env.VITE_API_KEY,
    BASE_URL: import.meta.env.VITE_BASE_URL,
    IMAGE_BASE_URL: import.meta.env.VITE_IMAGE_BASE_URL,
};

export const API_ENDPOINTS = {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    UPCOMING: '/movie/upcoming'
};