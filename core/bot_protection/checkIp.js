const puppeteer = require("puppeteer");

async function main() {
const web =  await puppeteer.launch({headless: false });

const page = await web.newPage();

await page.goto('https://www.whatismyip.com/');

}

main();