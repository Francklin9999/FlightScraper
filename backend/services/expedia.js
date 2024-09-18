const { Expedia } = require('../../core/main');
const { transformParameters } = require('../utils/transformParameters');

async function expediaHandler(req, res) {
    console.log('Request expedia received');
    try {
        const data = req.query;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No parameters were provided.' });
        }

        const result = await Expedia(transformParameters(data));
        res.json(result);
    } catch (error) {
        console.error('Error processing Expedia function:', error);
        res.status(500).json({ error: 'An error occurred', details: error.message });
    }
}

module.exports = expediaHandler;
