const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const readline = require('readline');

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
    return new Promise((resolve, reject) => {
      rl.question(questions[index], (answer) => {
        resolve(answer);
      });
    });
  };

async function loadingPrice(html) {
    const $ = cheerio.load(html);
    const text = String($('[stid="FLIGHTS_DETAILS_AND_FARES-index-1-leg-0-fsr-FlightsActionButton"]').text());
  
    const priceRegex1 = /\$(\d+)/;
    const priceRegex2 = /\$(\d+)\,(\d+)/;
    const match1 = text.match(priceRegex1);
    const match2 = text.match(priceRegex2);

    let price = '';

    if (match2) {
        price = match2[0];
        return price;
    } else if (match1) {
        price = match1[0];
        return price;
    } else {
        return 'Price not found';
    }
  
  
}


async function main() {
    const browser = await puppeteer.launch({ headless: false });
    try {
        const answers = [];
    
        for (let i = 0; i < questions.length; i++) {
        const answer = await askQuestion(i);
        answers.push(answer);
        }

        console.log();
        console.log("Loading...");
        console.log();

        const url = `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:${answers[0]},to:${answers[1]},departure:${answers[2]}TANYT,fromType:U,toType:U&leg2=from:${answers[1]},to:${answers[0]},departure:${answers[3]}TANYT,fromType:U,toType:U&options=cabinclass:economy&fromDate=${answers[2]}&toDate=${answers[3]}&d1=2024-8-13&d2=2024-8-20&passengers=adults:1,infantinlap:N`;

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        await delay(3000);

        const htmlContent = await page.content();

        console.log();
        console.log("Searching...");
        console.log();

        await delay(10000);
        
        console.log();
        console.log("Searching for the lowest price...");
        console.log();

        await delay(6000);
        const price = await loadingPrice(htmlContent);

        console.log(`Lowest Price: ${price}`);
        console.log();
        await delay(2000);
        console.log("Downloading the url...");
        await delay(5000);
        console.log(`URL: ${url}`);
        console.log();
    }
    catch(error){
      console.error(error);
    } finally {
      browser.close();
      process.exit(0);
    }

}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



main();

