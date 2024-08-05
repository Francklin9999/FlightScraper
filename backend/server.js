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
    const data = req.query;

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No parameters were provided.' });
    }

    function transformParameters(params) {
        const departureArray = params.departure.split(',');
        const returnArray = params.return.split(',');
      
        const adults = Number(params.adults);
        const headless = true; 
      
        return {
            origin: params.origin,
            destination: params.destination,
            departure: departureArray,
            return: returnArray,
            adults: adults,
            class: params.class,
            headless: headless
        };
    }

    console.log('Parameters received', transformParameters(data));

    res.setHeader('Content-Type', 'application/json');

    const handleResult = (result) => {
        if (result !== null) {
            res.write(JSON.stringify(result) + '\n');
        }
    };

    const functions = [Expedia, Flighthub, SkyScanner, Cheapflights];

    for (const fn of functions) {
        try {
            const result = await fn(transformParameters(data));
            handleResult(result);
        } catch (error) {
            // res.write(JSON.stringify({ error: 'An error occurred', details: error.message }) + '\n');
            console.error('Error processing function:', error);
        }
    }

    res.end();
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
