const express = require('express');
const app = express();
const { main, Expedia, Flighthub, SkyScanner, Cheapflights } = require('../core/main');
const { PORT_BACKEND } = require('../const');

const PORT = PORT_BACKEND;

app.get('/', async (req, res) => {
    console.log('Received');
    res.setHeader('Content-Type', 'application/json');

    const functions = [Expedia, Flighthub, SkyScanner, Cheapflights];

    const promises = functions.map(async (fn) => {
        try {
            const result = await fn();
            res.write(JSON.stringify(result) + '\n');
        } catch (error) {
            console.error('Error processing function:', error);
            // res.write(JSON.stringify({ error: 'An error occurred' }) + '\n');
        };
    });

    await Promise.all(promises);

    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





