const express = require('express');
const cors = require('cors');
const app = express();
const expediaHandler = require('./services/expedia');
const flighthubHandler = require('./services/flighthub');
const skyscannerHandler = require('./services/skyscanner');
const cheapflightsHandler = require('./services/cheapflights');
const { PORT_BACKEND } = require('../const');

const PORT = PORT_BACKEND;

// Middleware
app.use(cors());
app.use(express.json());

// app.get('/api/expedia', expediaHandler);
// app.get('/api/flighthub', flighthubHandler);
// app.get('/api/skyscanner', skyscannerHandler);
app.get('/api/cheapflights', cheapflightsHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

