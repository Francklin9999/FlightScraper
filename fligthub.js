const puppeteer = require("puppeteer");

const originInput = "Ottawa";
const destinationInput = "Londres";

async function main() {
    try {
    const browser = await puppeteer.launch({ headless: false });
    await delay(5000);
    const page = await browser.newPage();
    await delay(5000);

    const url = "https://www.flighthub.com/#flights";
    await delay(1000);
    await page.goto(url, { waitUntil: 'networkidle2' });

    await delay(15000);

    let inputSelector = '';

    inputSelector = 'input#seg0_from_display';

    await page.evaluate((selector) => {
        document.querySelector(selector).value = '';
      }, inputSelector);

    await delay(1000);

    await page.focus('input#seg0_from_display');

    for(let i = 0; i < originInput.length; i++) {
        await page.keyboard.press(originInput[i]);
        await delay(100);
    }
    await page.keyboard.press('Enter');
    // await delay(1000);
    await delay(2000);

    inputSelector = 'input#seg0_to_display';

    await page.evaluate((selector) => {
        document.querySelector(selector).value = '';
      }, inputSelector);

    await delay(2000);

    await page.click('input#seg0_to_display');

    for(let k = 0; k < destinationInput.length; k++) {
        await page.keyboard.press(destinationInput[k]);
        await delay(100);
    }
    await delay(1000);
    await page.keyboard.press('Enter');
    await delay(3000);
    await page.click('div#seg0_date');
    await delay(5000);
    await page.click('#home-top-section > div > div.home-search-form-wrapper > form > div.segment-wrapper.roundtrip > div > div.home-search-form-right > div:nth-child(1) > div > div.date-picker.date-picker__with-header > div.rdrCalendarWrapper.rdrDateRangeWrapper > div.rdrMonths.rdrMonthsHorizontal > div:nth-child(1) > div.rdrDays > button.rdrDay.rdrDayToday');
    await delay(5000);
    await page.click('div#seg1_date');
    await delay(5000);
    await page.click('#home-top-section > div > div.home-search-form-wrapper > form > div.segment-wrapper.roundtrip > div > div.home-search-form-right > div:nth-child(1) > div > div.date-picker.date-picker__with-header > div.rdrCalendarWrapper.rdrDateRangeWrapper > div.rdrMonths.rdrMonthsHorizontal > div:nth-child(1) > div.rdrDays > button.rdrDay.rdrDayEndOfMonth');
    await delay(5000);
    await page.click('#home-top-section > div > div.home-search-form-wrapper > form > div.segment-wrapper.roundtrip > div > div.home-search-form-right > div.home-search-form-submit.flights');
    
    // await delay(5000);
    // await page.click('button.BpkButton_bpk-button__OTE4Z BpkButton_bpk-button--large__NTAyN BpkButton_bpk-button--featured__NTk3N.SearchControls_DesktopCTA__ZGI4N');
    // await delay(5000);
    }
    catch(error){
        console.error(error);
    }

    // await browser.close();
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


main();