const WebScraping = require('../modal');
// import { cityToAirportCode } from 'airport-code.js';

class Flighthub {

    #class;

    constructor(data) {
        this.originAirportCode = data["origin"];
        this.destinationAirportCode = data["destination"];
        this.departureDay = data["departure"][0];
        this.departureMonth = data["departure"][1];
        this.departureYear = data["departure"][2];
        this.returnDay = data["return"][0];
        this.returnMonth = data["return"][1];
        this.returnYear = data["return"][2];
        this.adultNumber = data["adult"] || 1;
        this.class= data["class"] || "Economy";
        this.oneWay = data["oneWay"] || null;
        this.headless = data["headless"] || false;
        this.delay = data["delay"] || 3333;
    }

    getUrl() {
        if(this.oneWay) {
            return(
                `https://www.flighthub.com/flight/search?num_adults=${this.adultNumber}&num_children=0&num_infants=0&num_infants_lap=0&seat_class=${this.#class}&type=oneway&campaign=1&seg0_from=${this.originAirportCode}&seg0_to=${this.destinationAirportCode}&seg0_date=${this.departureYear}-${this.departureMonth}-${this.departureDay}`
            );
        };
        return (
            `https://www.flighthub.com/flight/search?num_adults=${this.adultNumber}&num_children=0&num_infants=0&num_infants_lap=0&seat_class=${this.#class}&type=roundtrip&campaign=1&seg0_from=${this.originAirportCode}&seg0_to=${this.destinationAirportCode}&seg0_date=${this.departureYear}-${this.departureMonth}-${this.departureDay}&seg1_date=${this.returnYear}-${this.returnMonth}-${this.returnDay}&seg1_from=${this.destinationAirportCode}&seg1_to=${this.originAirportCode}`
        );
        
    }

    set class(value) {
        const _classes = {
            "economy" : "Economy",
            "premium" : "EconomyPremium",
            "business" : "Business",
            "first" : "First",
        }

        const _value = _classes[value] !== undefined ? _classes[value] : null;

        const classes = ["Economy", "EconomyPremium", "Business", "First"];

        if (!classes.includes(value)) {
            this.#class = classes[0];
        } else {
            this.#class = _value;
        };
    };

    setDelay(delay) {
        this.delay = delay;
    }

    async getPrice(priceElement) {
        let price = null;
        const pattern = /([\d,]+\.\d{2})/;
        price = WebScraping.regex(pattern, priceElement);
        if(price === null) {
            price = 'Not found';
        } else {
            price = price[0];

            const numericPrice = parseFloat(price.replace(/,/g, ''));
            const roundedPrice = Math.ceil(numericPrice * 100) / 100;
            price = roundedPrice.toFixed(2);
        };
        
        return price;
    }

    async Scrape() {
        const url = this.getUrl();

        const web = new WebScraping({ delay:this.delay, url:url });

        await web.launchBrowser({ headless:this.headless, viewPort:false });

        await web.newPage();

        await web.goTo({ waitUntil:'networkidle2' });

        await web.waitDelay(10000);

        const priceElement = await web.getElementByText(".tab-btn.cheapest");

        await web.finalize();

        const price = await this.getPrice(priceElement);

        const siteUrl = web.getUrl();

        return { site: "Flighthub", price: `$${price}`, url: siteUrl, adultNumber: this.adultNumber, class: this.#class };
    }
}

module.exports = Flighthub;