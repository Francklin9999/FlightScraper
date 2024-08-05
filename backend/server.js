const express = require('express');
const cors = require('cors');
const app = express();
const { Expedia, Flighthub, SkyScanner, Cheapflights } = require('../core/main');
const { PORT_BACKEND } = require('../const');

const PORT = PORT_BACKEND;

//Middleware
app.use(cors());
app.use(express.json());

app.get('/api', async (req, res) => {
    const params = {                 
        "origin": "YUL",
        "destination": "JFK",
        "departure": ["18", "12", "2024"],
        "return": ["10", "01", "2025"],
        "adults": 1,
        "class": "economy",
        "headless": true,
    }

    const data = req.query;

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No parameters were provided.' });
    }
    
    console.log('Parameters received', data);

    res.setHeader('Content-Type', 'application/json');

    const functions = [Flighthub, SkyScanner, Cheapflights];

    const promises = functions.map(async (fn) => {
        try {
            const result = await fn(params);
            res.write(JSON.stringify(result) + '\n');
        } catch (error) {
            res.status(500).json({ error: 'An eroor occurred' });
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
