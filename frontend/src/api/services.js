import axios from 'axios';
import { transformCheapflightsData } from './handleCheapflights.js';
import { transformSkyscannerData } from './handleSkyscanner.js';
import { transformFlighthubData } from './handleFlighthub.js';
import { transformExpediaData } from './handleExpedia.js';

const BASE_URL = 'http://localhost:3000';

const fetchExpediaData = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/expedia`, { params });
        if(response.data == null) return;
         return transformExpediaData(response.data);
    } catch (error) {
        return [];
    }
};

const fetchFlighthubData = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/flighthub`, { params });
        if(response.data == null) return;
        return transformFlighthubData(response.data);
    } catch (error) {
        return [];
    }
};

const fetchSkyScannerData = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/skyscanner`, { params });
        if(response.data == null) return;
        return transformSkyscannerData(response.data);
    } catch (error) {
        return [];
    }
};

const fetchCheapflightsData = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/cheapflights`, { params });
        if(response.data == null) return;
        return transformCheapflightsData(response.data);
    } catch (error) {
        return [];
    }
};

export const fetchAndProcessData = async (params) => {
    const fetchFunctions = [
        fetchExpediaData(params),
        // fetchFlighthubData(params),
        // fetchSkyScannerData(params),
        // fetchCheapflightsData(params),
    ];

    const results = await Promise.allSettled(fetchFunctions);

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log('Data received:', result.value);
        } else {
            console.error('Fetch failed:', result.reason);
        }
    });

    const allData = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value);

    return allData;
};

const test_data = {
    "origin": "Montreal - Dorval (Montréal-Trudeau) - YUL",
    "destination": "New York - John F. Kennedy (NY) - JFK",
    "departure": "2024-10-09",
    "return": "2024-11-09",
    "adults": "1 Adult",
    "class": "Economy",
    "headless": true,
}
// const params = { };
fetchAndProcessData(test_data).then(allData => {
    console.log('Combined Data:', allData);
});
