const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

class WebScraping {

    #browser = null;
    #page = null;

    constructor(delay = 0, url = "https://www.google.com") {
        this.delay = delay;
        this.url = url;
    }

    async launchBrowser(headless = true, viewPort = { width: 1280, height: 800 }) {
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

    async goTo(waitUntil = 'load') {
        if (this.#page !== null) {
            await this.#page.goto(this.url, { waitUntil: waitUntil });
            await this.#delay();
        } else {
            throw new Error('Page is not created.');
        }
    }

    async getElement(selector) {
        if (this.#page !== null) {
            const priceElement = await this.#page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent.trim() : 'Element not found';
            }, selector);
    
            return priceElement;
        } else {
            throw new Error('Page is not created.');
        }
    }

    async #delay() {
        await new Promise(resolve => setTimeout(resolve, this.delay));
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
