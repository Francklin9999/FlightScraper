const puppeteer = require("puppeteer");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const originInput = "Montreal";
const destinationInput = "abcOttawa";

async function askQuestion(index) {
    const questions = [
      'Origin: ',
      'Destination: ',
      'Departure Date (30/7/2024): ',
      'Return Date (30/7/2024): ',
    ];
  
    if (index >= questions.length) {
      console.log("loading...")
      rl.close();
      return;
    }
  
    rl.question(questions[index], (answer) => {
      answers.push(answer);
      askQuestion(index + 1);
    });
  };

  const answers = [];

async function main() {
    try {
    

    
      await askQuestion(0);

    // const browser = await puppeteer.launch({ headless: false });
    // const page = await browser.newPage();

    const url = `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:${answers[0]},to:${answers[1]},departure:${answers[2]}TANYT,fromType:U,toType:U&leg2=from:${answers[2]},to:${answers[1]},departure:${answers[3]}TANYT,fromType:U,toType:U&options=cabinclass:economy&fromDate=${answers[2]}&toDate=${answers[3]}&d1=2024-8-13&d2=2024-8-20&passengers=adults:1,infantinlap:N`;
    console.log(url);
    // await delay(1000);
    // await page.goto(url, { waitUntil: 'networkidle2' });

    // await delay(15000);

    // await page.click('#multi-product-search-form-1 > div > div > div > div > div.uitk-tabs-container > ul > li:nth-child(2) > a');

    // await delay(1000);

    // await page.click('#FlightSearchForm_ROUND_TRIP > div > div.uitk-layout-flex-item.uitk-layout-flex-item-flex-basis-half_width.uitk-layout-flex-item-flex-grow-1 > div > div.uitk-input-swapper-start-input > div > div > div:nth-child(2) > div:nth-child(1) > button');

    // await delay(500);

    // for(let i = 0; i < originInput.length; i++) {
    //     await page.keyboard.press(originInput[i]);
    //     await delay(100);
    // }
    // await page.keyboard.press('Enter');
    // await delay(1000);

    // await delay(2000);

    // await page.click('#FlightSearchForm_ROUND_TRIP > div > div.uitk-layout-flex-item.uitk-layout-flex-item-flex-basis-half_width.uitk-layout-flex-item-flex-grow-1 > div > div.uitk-input-swapper-end-input > div > div > div:nth-child(2) > div:nth-child(1) > button');

    // for(let k = 0; k < destinationInput.length; k++) {
    //     await page.keyboard.press(destinationInput[k]);
    //     await delay(100);
    // }
    // await delay(1000);
    // await page.keyboard.press('Enter');
    // await delay(10000);
    // await page.click('#search_button');
    }
    catch(error){
        console.error(error);
    }

}


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

main();