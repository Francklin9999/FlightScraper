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
};

const data2 = {
    "origin" : "YUL",
    "destination" : "JFK",
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

//To test to the console
async function main() {
    const web1 = new expedia(data4);
    const web2 = new flighthub(data2);
    const web3 = new skyscanner(data3);
    const web4 = new cheapflights(data4);
    
    // console.log(await web1.Scrape());
    // console.log(await web2.Scrape());
    // console.log(await web3.Scrape());
    // console.log(await web4.Scrape());

    web1.Scrape().then(response => console.log(response));
    web2.Scrape().then(response => console.log(response));
    web3.Scrape().then(response => console.log(response));
    web4.Scrape().then(response => console.log(response));
};

// main();

async function Expedia(data) {
    const web = new expedia(data);
    try {
        return (await web.Scrape());
        } catch (error) {
            console.error(error);
            return;
        };
};

async function Flighthub(data) {
    const web = new flighthub(data);
    try {
        return (await web.Scrape());
        } catch (error) {
            console.error(error);
            return;
        };
};

async function SkyScanner(data) {
    const web = new skyscanner(data);
    try {
        return (await web.Scrape());
        } catch (error) {
            console.error(error);
            return;
        };
};

async function Cheapflights(data) {
    const web = new cheapflights(data);
    try {
        return (await web.Scrape());
        } catch (error) {
            console.error(error);
            return;
        };
};

module.exports = {
    Expedia,
    Flighthub,
    SkyScanner,
    Cheapflights,
};

