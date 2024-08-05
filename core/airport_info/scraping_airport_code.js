//Request and request-promise doesn't work

const puppeteer = require('puppeteer');
const fs = require('fs');

async function main() {
    const url = 'https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle2' });

    let allData = [];

    for (let letter of alphabet) {
        const selector = `.wrap#${letter}`;
        const data = await page.evaluate((selector) => {
            const rows = Array.from(document.querySelectorAll(`${selector} tr`));
            return rows.map(row => {
                const td = Array.from(row.querySelectorAll('td'));
                const data1 = td[0] ? td[0].textContent.trim() : '';
                const data2 = td[1] ? td[1].textContent.trim() : '';
                const data3 = td[2] ? td[2].textContent.trim() : '';

                if (data1 && data2 && data3) {
                    return { data1, data2, data3 };
                }
                return null;
            }).filter(item => item !== null);
        }, selector);

        allData = allData.concat(data);
    }

    await browser.close();

    const jsonData = JSON.stringify(allData, null, 2);

    fs.writeFileSync('data.json', jsonData, 'utf8');
    fs.writeFileSync('../airport_code.json', jsonData, 'utf8');

}

main();


