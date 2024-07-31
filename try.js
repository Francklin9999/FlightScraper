const WebScraping = require('./modal');
const readline = require('readline');

const answers = [];

async function Scrape(url) {
    const web = new WebScraping(1111, url);

    await web.launchBrowser(false, false);

    await web.newPage();

    await web.goTo('networkidle2');

    const priceElement = String(await web.getElement('[stid="FLIGHTS_DETAILS_AND_FARES-index-1-leg-0-fsr-FlightsActionButton"]'));

    const pattern1 = /\$(\d+)/;
    const pattern2 = /\$(\d+)\,(\d+)/;

    let price = WebScraping.regex(pattern2, priceElement);

    if(price === null) {
        price = WebScraping.regex(pattern1, priceElement);
    };

    if(price != null) {
        price = price[0];
    } else {
        price = "Not found";
    }

    console.log();
    console.log("Lowest price: " + price);
    console.log();

    console.log();
    console.log("URL: " + web.url);
    console.log();

    await web.finalize();
}

async function getData() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const questions = [
        'Origin: ',
        'Destination: ',
        'Departure Date (DD/MM/YYYY): ',
        'Return Date (DD/MM/YYYY): ',
      ];

    const askQuestion = (index) => {
        return new Promise((resolve) => {
            rl.question(questions[index], (answer) => {
                answers[index] = answer;
                resolve();
            });
        });
    };

    for (let i = 0; i < questions.length; i++) {
        await askQuestion(i);
    }   

    rl.close();
    
    url = `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:${answers[0]},to:${answers[1]},departure:${answers[2]}TANYT,fromType:U,toType:U&leg2=from:${answers[1]},to:${answers[0]},departure:${answers[3]}TANYT,fromType:U,toType:U&options=cabinclass:economy&fromDate=${answers[2]}&toDate=${answers[3]}&d1=2024-8-13&d2=2024-8-20&passengers=adults:1,infantinlap:N`;

    return url;
}

async function main() {
    const url = await getData();
    await Scrape(url);
};

main();
