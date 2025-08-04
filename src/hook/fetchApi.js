import { useState, useEffect, useRef } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const previousUrlRef = useRef(null);

    useEffect(() => {
        if (!url) {
            return;
        }
        // Don't refetch if URL hasn't changed
        if (url === previousUrlRef.current) {
            return;
        }

        const fetchData = async () => {
            try {
                previousUrlRef.current = url;
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                // console.log("fetch data", json);
                setData(json.results || json);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                // console.error("Fetch error:", err);
            }
        };
        fetchData();

    }, [url]);

    return { data, error, loading };
};

export default useFetch;