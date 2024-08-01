const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

class WebScraping {

    #browser = null;
    #page = null;
    url = null;
    delay = null;

    constructor(delay=0, url="https://www.google.com") {
        this.delay = delay;
        this.url = url;
    }

    async launchBrowser(headless=true, viewPort={ width: 1280, height: 800 }) {
        puppeteer.use(StealthPlugin());
        this.#browser = await puppeteer.launch({
            headless: headless,
            args: ['--no-sandbox'],
            defaultViewport: viewPort,
        });
    }

    async newPage() {
        if (this.#browser !== null) {
            this.#page = await this.#browser.newPage();
        } else {
            throw new Error('Browser is not launched.');
        }
    }

    async goTo(waitUntil='load', url=null) {
        if (url !== null) {
            this.url = url;
        }
        if (this.#page !== null) {
            await this.#page.goto(this.url, { waitUntil: waitUntil });
            await this.waitDelay();
        } else {
            throw new Error('No url is set.');
        }
    }

    async click(slector) {
        if (this.#page !== null) {
            await this.#page.click(slector);
            await this.delay();
        } else {
            throw new Error('Page is not created.');
        }
    }

    async getElementByText(selector) {
        if (this.#page !== null) {
            const priceElement = await this.#page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent.trim() : 'Element not found';
            }, selector);
    
            return String(priceElement);
        } else {
            throw new Error('Page is not created.');
        }
    }

    async getPrice(priceElement) {
        let price = null;
        const pattern1 = /(\d+)/;
        const pattern2 = /(\d+)\,(\d+)/;
        if (this.#page !== null) {
            price = WebScraping.regex(pattern2, priceElement);
            if(price === null) {
                price = WebScraping.regex(pattern1, priceElement);
            };
        };

        if(price === null) {
            price = 'Not found';
        } else {
            price = price[0];
        };
        
        console.log();
        console.log("Lowest price: CAD $" + price);
        console.log();
    }

    getUrl() {
        if (this.#page !== null) {
            return this.url;
        } else {
            throw new Error('No url is set.');
        }
    }

    async waitDelay(_delay=null) {
        const delayTime = _delay !== null ? _delay : this.delay;
        await new Promise(resolve => setTimeout(resolve, delayTime));
    }

    static regex(pattern, text) {
        return text.match(pattern);
    }

    async finalize() {
        if (this.#page !== null) {
            await this.#browser.close();
            this.#browser = null;
            this.#page = null;
        }
    }
}

module.exports = WebScraping;
