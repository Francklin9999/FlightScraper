const expedia = require('./expedia');
const flighthub = require('./flighthub');
const skyscanner = require('./skyscanner');
const cheapflights = require('./cheapflights');

const data1 = {
    "origin" : "Vancouver",
    "destination" : "London",
    "departure" : ["12", "09", "2024"],
    "return" : ["15", "11", "2024"],
}

const data2 = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["12", "09", "2024"],
    "return" : ["15", "11", "2024"],
}

const data3 = {
    "origin" : "LAX",
    "destination" : "JFK",
    "departure" : ["12", "10", "2024"],
    "return" : ["11", "12", "2024"],
}

const data4 = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["10", "11", "2024"],
    "return" : ["08", "12", "2024"],
}

async function main() {
    const web1 = new expedia(data1);
    await web1.Scrape();

    const web2 = new flighthub(data2);
    await web2.Scrape();

    const web3 = new skyscanner(data3); 
    await web3.Scrape();

    const web4 = new cheapflights(data4); 
    await web4.Scrape();
}

main();