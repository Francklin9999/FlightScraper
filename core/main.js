const expedia = require('./sites/components/expedia');
const flighthub = require('./sites/components/flighthub');
const skyscanner = require('./sites/components/skyscanner');
const cheapflights = require('./sites/components/cheapflights');

const data1 = {
    "origin" : "Montreal",
    "destination" : "Toronto",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
};

const data2 = {
    "origin" : "YUL",
    "destination" : "DLA",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
};

const data3 = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
};

const data4 = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
};

async function Expedia(data) {
    const web = new expedia(data);
    try {
        let elements = await web.Scrape();
        // let retries = 3; 
        // while (elements["texts"] === "" && retries > 0) {
        //     console.log("Expedia not found, retrying...");
        //     elements = await web.Scrape();
        //     retries--;
        // };

        // if (elements["texts"] === "") {
        //     console.log("Price not found after multiple attempts.");
        //     return null;
        // };

        return elements;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    };
};

async function Flighthub(data) {
    const web = new flighthub(data);
    try {
        let elements = await web.Scrape();
        // let retries = 3; 
        // while (elements["price"] === "$Not found" && retries > 0) {
        //     console.log("Price not found, retrying...");
        //     elements = await web.Scrape();
        //     retries--;
        // };

        // if (elements["price"] === "$Not found") {
        //     console.log("Price not found after multiple attempts.");
        //     return null;
        // };

        return elements;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    };
};

async function SkyScanner(data) {
    const web = new skyscanner(data);
    try {
        let elements = await web.Scrape();
        // let retries = 3; 
        // while (elements["price"] === "$Not found" && retries > 0) {
        //     console.log("Price not found, retrying...");
        //     elements = await web.Scrape();
        //     retries--;
        // };

        // if (elements["price"] === "$Not found") {
        //     console.log("Price not found after multiple attempts.");
        //     return null;
        // };

        return elements;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    };
};

async function Cheapflights(data) {
    const web = new cheapflights(data);
    try {
        let elements = await web.Scrape();
        // let retries = 3; 
        // while (elements["price"] === "$Not found" && retries > 0) {
        //     console.log("Price not found, retrying...");
        //     elements = await web.Scrape();
        //     retries--;
        // };

        // if (elements["price"] === "$Not found") {
        //     console.log("Price not found after multiple attempts.");
        //     return null;
        // };

        return elements;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    };
};

//To test to the console
async function main() {
    // const web1 = ;
    // const web2 = ;
    // const web3 = ;
    // const web4 = ;
    
    // // console.log(await web1.Scrape());
    // // console.log(await web2.Scrape());
    // // console.log(await web3.Scrape());
    // // console.log(await web4.Scrape());

    // Expedia(data2).then(response => console.log(response));
    // Flighthub(data2).then(response => console.log(response));
    // SkyScanner(data2).then(response => console.log(response));
    // Cheapflights(data2).then(response => console.log(response));
};

// main();

module.exports = {
    Expedia,
    Flighthub,
    SkyScanner,
    Cheapflights,
};

