const request = require('request-promise');
const cheerio = require('cheerio');

async function main() {
    const url = 'https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm';

    const result = await request.get(url);
    const $ = cheerio.load(result.body);
    const data = $('div#A > table > tbody > tr').map((index, element) => {
        const airportName = $(element).children().eq(0).text();
        const airportCity = $(element).children().eq(1).text();
        const airportCode = $(element).children().eq(2).text();
        return {
            airportName,
            airportCity,
            airportCode,
        }
    }).get();
    console.log(data);
}

main();