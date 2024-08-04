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
    const web1 = new expedia();
    const web2 = new flighthub();
    const web3 = new skyscanner();
    const web4 = new cheapflights();
    
    web1.Scrape();
    web2.Scrape();
    web3.Scrape();
    web4.Scrape();
};

async function Expedia() {
    const web = new expedia(data1);
    return (await web.Scrape());
};

async function Flighthub() {
    const web = new flighthub(data2);
    return (await web.Scrape());
};

async function SkyScanner() {
    const web = new skyscanner(data3);
    return (await web.Scrape());
};

async function Cheapflights() {
    const web = new cheapflights(data4);
    return (await web.Scrape());
};

module.exports = {
    main,
    Expedia,
    Flighthub,
    SkyScanner,
    Cheapflights,
};

