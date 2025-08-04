import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                // console.log("Provied URL")
            }
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                // console.log(json)
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