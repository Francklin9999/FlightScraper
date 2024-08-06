const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const readline = require('readline');
const { DEFAULT_VIEWPORT } = require("puppeteer");

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
    const browser = await puppeteer.launch({ headless: false, defaultViewport: false });
    const page = await browser.newPage();

}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



main();

