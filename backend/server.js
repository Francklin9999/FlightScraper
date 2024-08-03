const express = require('express');
const app = express();
const scraper = require('../core/main'); // Import the main function

app.get("/", async (req, res) => {
    try {
        const data = await scraper(); // Await the scraper function
        res.json(data); // Send the scraped data as JSON
    } catch (err) {
        console.error(err); // Log the error to the console
        res.status(500).json({ message: 'Error scraping data' }); // Send an error response
    }
    console.log(2); // This logs to the terminal
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

