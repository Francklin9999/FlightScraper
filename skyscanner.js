const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const originInput = "Ottawa";
const destinationInput = "Londres";

async function main() {
    try {
    const browser = await puppeteer.launch({ headless: false });
    await delay(5000);
    const page = await browser.newPage();
    await delay(5000);

    const url = "https://www.skyscanner.fr/";
    await delay(5000);
    await page.goto(url, { waitUntil: 'networkidle2' });

    const element = await page.$('div.bpk-scrim-content_bpk-scrim-content__OTJhN.cookie-banner-wrapper');
    if (element) {
        page.click('button');
    } 

    // const html = await page.content();
    // const $ = cheerio.load(html);

    await delay(5000);

    await page.type('input#originInput-input', originInput);
    await delay(5000);
    await page.type('input#destinationInput-input', destinationInput);
    await delay(5000);
    await page.click('button[aria-label="Sélectionnez une date de départ"]');
    await delay(5000);
    await page.click('button[aria-label="mardi 30 juillet 2024"]');
    await delay(5000);
    await page.click('button[aria-label="jeudi 8 août 2024"]');
    await delay(5000);
    await page.click('button.BpkButton_bpk-button__OTE4Z BpkButton_bpk-button--large__NTAyN BpkButton_bpk-button--featured__NTk3N.DatePickerFooter_SearchButton__N2ZiN');
    await delay(5000);
    await page.click('button.BpkButton_bpk-button__OTE4Z BpkButton_bpk-button--large__NTAyN BpkButton_bpk-button--featured__NTk3N.SearchControls_DesktopCTA__ZGI4N');
    await delay(5000);
    }
    catch(error){
        console.error(error);
    }

    // await browser.close();
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


main();