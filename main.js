const expedia = require('./expedia');
const flighthub = require('./flighthub');

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

async function main() {
    const web1 = new expedia(data1);
    const web2 = new flighthub(data2);
    await web1.Scrape();
    await web2.Scrape();
}

main();