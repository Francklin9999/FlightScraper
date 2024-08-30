const WebScraping = require('../webScraping');

async function main() {

const web = new WebScraping({delay: 1111, url: 'https://bot.sannysoft.com/'});

await web.launchBrowser({ headless: false });

await web.newPage();

await web.goTo({ waitUntil: 'networkidle2' });

};

main();