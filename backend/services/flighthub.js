const { Flighthub } = require('../../core/main');
const { transformParameters } = require('../utils/transformParameters');

async function flighthubHandler(req, res) {
    try {
        const data = req.query;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No parameters were provided.' });
        }

        const result = await Flighthub(transformParameters(data));
        res.json(result);
    } catch (error) {
        console.error('Error processing Flighthub function:', error);
        res.status(500).json({ error: 'An error occurred', details: error.message });
    }
}

module.exports = flighthubHandler;
