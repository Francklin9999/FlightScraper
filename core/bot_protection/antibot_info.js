const WebScraping = require('../modal');

async function main() {

const web = new WebScraping(1111, 'https://bot.sannysoft.com/');

await web.launchBrowser(false, false);

await web.newPage();

await web.goTo('networkidle2');

};

main();