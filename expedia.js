const WebScraping = require('./modal');
const readline = require('readline');

const answers = [];

async function Scrape(url) {
    const web = new WebScraping(delay=1111, url=url);

    await web.launchBrowser(true, false);

    await web.newPage();

    await web.goTo(waituntil='networkidle2');

    const priceElement = await web.getElementByText('[stid="FLIGHTS_DETAILS_AND_FARES-index-1-leg-0-fsr-FlightsActionButton"]');

    await web.getPrice(priceElement);

    web.getUrl;

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

    const [dayOrigin, monthOrigin, yearOrigin] = answers[2].split('/');
    const [dayDestination, monthDestination, yearDestination] = answers[3].split('/');
    
    url = `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:${answers[0]},to:${answers[1]},departure:${dayOrigin}/${monthOrigin}/${yearOrigin}TANYT,fromType:U,toType:U&leg2=from:${answers[1]},to:${answers[0]},departure:${dayDestination}/${monthDestination}/${yearDestination}TANYT,fromType:U,toType:U&options=cabinclass:economy&fromDate=${dayOrigin}/${monthOrigin}/${yearOrigin}&toDate=${dayDestination}/${monthDestination}/${yearDestination}&d1=${yearOrigin}-${monthOrigin}-${dayOrigin}&d2=${yearDestination}-${monthDestination}-${dayDestination}&passengers=adults:1,infantinlap:N`;

    return url;
}

async function main() {
    const url = await getData();
    console.log();
    console.log("Searching for the best price...");
    console.log();
    await Scrape(url);
};

main();
