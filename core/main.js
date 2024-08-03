const expedia = require('./sites/expedia');
const flighthub = require('./sites/flighthub');
const skyscanner = require('./sites/skyscanner');
const cheapflights = require('./sites/cheapflights');

const data1 = {
    "origin" : "Montreal",
    "destination" : "Toronto",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
}

const data2 = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
}

const data3 = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
}

const data4 = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
}

async function main() {
    console.log('Received');

    // Create instances
    const web1 = new expedia(data1);
    const web2 = new flighthub(data2);
    const web3 = new skyscanner(data3);
    const web4 = new cheapflights(data4);

    try {
        // Use Promise.all to run all Scrape functions concurrently
        const [result1, result2, result3, result4] = await Promise.all([
            web1.Scrape().catch(error => {
                console.error('Expedia error:', error);
                return null; // Return null or handle errors as needed
            }),
            web2.Scrape().catch(error => {
                console.error('Flighthub error:', error);
                return null; // Return null or handle errors as needed
            }),
            web3.Scrape().catch(error => {
                console.error('Skyscanner error:', error);
                return null; // Return null or handle errors as needed
            }),
            web4.Scrape().catch(error => {
                console.error('Cheapflights error:', error);
                return null; // Return null or handle errors as needed
            })
        ]);

        // Return all results
        return {
            expedia: result1,
            flighthub: result2,
            skyscanner: result3,
            cheapflights: result4
        };
    } catch (error) {
        console.error('Error in main function:', error);
        throw error; // Rethrow or handle errors as needed
    }
}


module.exports = main;