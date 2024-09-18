const { Cheapflights } = require('../../core/main');
const { transformParameters } = require('../utils/transformParameters');

async function cheapflightsHandler(req, res) {
    console.log('Request cheapflights received');
    try {
        const data = req.query;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No parameters were provided.' });
        }

        const result = await Cheapflights(transformParameters(data));
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error('Error processing Cheapflights function:', error);
        res.status(500).json({ error: 'An error occurred', details: error.message });
    }
}

module.exports = cheapflightsHandler;