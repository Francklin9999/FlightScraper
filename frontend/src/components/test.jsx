import React, { useEffect, useState } from 'react';
import { fetchExpediaData, fetchFlighthubData, fetchSkyScannerData, fetchCheapflightsData } from './apiService'; // Adjust the path as necessary

const MainPage = () => {
    const [data, setData] = useState({
        expediaData: null,
        flighthubData: null,
        skyScannerData: null,
        cheapflightsData: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = { /* Your parameters here */ };

            // Define an array of fetch functions with their respective endpoints
            const fetchFunctions = [
                { name: 'expediaData', func: fetchExpediaData },
                { name: 'flighthubData', func: fetchFlighthubData },
                { name: 'skyScannerData', func: fetchSkyScannerData },
                { name: 'cheapflightsData', func: fetchCheapflightsData },
            ];

            // Track completed fetches
            const completedFetches = new Set();

            // Create a function to handle each fetch and update state incrementally
            const handleFetch = async ({ name, func }) => {
                try {
                    const result = await func(params);
                    setData(prevData => ({ ...prevData, [name]: result }));
                    completedFetches.add(name);
                } catch (error) {
                    console.error(`Error processing ${name}:`, error);
                    setError(error);
                }
            };

            // Start fetching data
            fetchFunctions.forEach(({ name, func }) => handleFetch({ name, func }));

            // Optionally, you can set loading to false once all data is fetched
            // if you want to stop showing the loading state.
            // setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Flight Data</h1>
            
            <h2>Expedia Data</h2>
            {data.expediaData && <pre>{JSON.stringify(data.expediaData, null, 2)}</pre>}

            <h2>Flighthub Data</h2>
            {data.flighthubData && <pre>{JSON.stringify(data.flighthubData, null, 2)}</pre>}

            <h2>SkyScanner Data</h2>
            {data.skyScannerData && <pre>{JSON.stringify(data.skyScannerData, null, 2)}</pre>}

            <h2>Cheapflights Data</h2>
            {data.cheapflightsData && <pre>{JSON.stringify(data.cheapflightsData, null, 2)}</pre>}
        </div>
    );
};

export default MainPage;
