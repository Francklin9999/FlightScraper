//File to test the server

const http = require('http');
const querystring = require('querystring');

// Assuming test_data is already in the correct format
const test_data = {
    "origin": "YUL",
    "destination": "JFK",
    "departure": ["18", "12", "2024"],
    "return": ["10", "01", "2025"],
    "adults": 1,
    "class": "economy",
    "headless": true,
};

// Convert the test_data object to a query string
const queryString = querystring.stringify({
    origin: test_data.origin,
    destination: test_data.destination,
    departure: test_data.departure.join(','), // Convert array to comma-separated string
    return: test_data.return.join(','),       // Convert array to comma-separated string
    adults: test_data.adults,
    class: test_data.class,
    headless: test_data.headless.toString()    // Convert boolean to string
});

// Set up the request options
const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/api?${queryString}`, // Ensure '?' is included before the query string
    method: 'GET',
};

// Make the GET request
http.get(options, (res) => {
    let data = '';

    // Collect data chunks
    res.on('data', (chunk) => {
        data += chunk;
        console.log(`Received chunk: ${chunk}`);
    });

    // Handle the end of the response
    res.on('end', () => {
        console.log('No more data.');
        console.log('Full response:', data);
    });

}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});




