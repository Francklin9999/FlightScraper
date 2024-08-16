const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

class WebScraping {

    browser = null;
    page = null;
    _defaultUrl = null;
    _url = null;
    _delay = null;

    constructor({ delay=0, defaultUrl=null, url="https://www.google.com" } = {}) {
        this.delay = delay;
        this.defaultUrl = defaultUrl;
        this.url = url;
    }

    get delay() {
        return this._delay;
    }

    set delay(value) {
        if (this._delay !== value) {
            this._delay = value;
        }
    }

    get defaultUrl() {
        return this._defaultUrl;
    }

    set defaultUrl(value) {
        if (this._defaultUrl !== value) {
            this._defaultUrl = value;
        }
    }

    get url() {
        return this._url;
    }

    set url(value) {
        if (this._url !== value) {
            this._url = value;
        }
    }

    async launchBrowser({ headless=true, viewPort={ width: 1280, height: 800 } } = {}) {
        puppeteer.use(StealthPlugin());
        try {
            this.browser = await puppeteer.launch({
                headless: headless,
                args: ['--no-sandbox'],
                defaultViewport: viewPort,
            });
            this.page = await this.browser.newPage();
        } catch (error) {
            throw new Error('Launch Failed');
        };
    };

    async newPage() {
        if (this.browser !== null) {
            this.page = await this.browser.newPage();
        } else {
            throw new Error('Browser is not launched.');
        }
    }

    async defaultRoute({url=null, waitUntil='load'} = {}) {
        if (url !== null) {
            this._url = url;
        }
        if (this.page !== null && this._defaultUrl !== null) {
            await this.page.goto(this._defaultUrl, { waitUntil: waitUntil })
        }
    }

    async goTo({url=null, waitUntil='load' } = {}) {
        if (url !== null) {
            this._url = url;
        }
        if (this.page !== null) {
            await this.page.goto(this._url, { waitUntil: waitUntil });
            await this.waitDelay();
        } else {
            throw new Error('No url is set.');
        }
    }

    async click(slector) {
        if (this.page !== null) {
            await this.page.click(slector);
            await this.delay();
        } else {
            throw new Error('Page is not created.');
        }
    }

    async getElementByText(selector) {
        if (this.page !== null) {
            const priceElement = await this.page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent.trim() : 'Element not found';
            }, selector);
    
            return String(priceElement);
        } else {
            throw new Error('Page is not created.');
        }
    }

    static getPrice(priceElement) {
        let price = null;
        const pattern1 = /(\d+)/;
        const pattern2 = /(\d+)\,(\d+)/;
        price = WebScraping.regex(pattern2, priceElement);
            if(price === null) {
                price = WebScraping.regex(pattern1, priceElement);
            };

        if(price === null) {
            price = 'Not found';
        } else {
            price = price[0];
        };
        
        return price;
    }

    async waitDelay(value=null) {
        const delayTime = value !== null ? value : this._delay;
        await new Promise(resolve => setTimeout(resolve, delayTime));
    }

    static regex(pattern, text) {
        return text.match(pattern);
    }

    async finalize() {
        if (this.page !== null) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}

module.exports = WebScraping;
