const WebScraping = require('../modal');

class Cheapflights {

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
        this.oneWay = data["oneWay"] || null;
        this.adultNumber = data["adult"] || 1;
        this.class= data["class"] || "economy";
        this.multiCity = data["multiCity"] || null;
        this.headless = data["headless"] || false;
        this.delay = data["delay"] || 1111;
    }

    getUrl() {
        if(this.oneWay) {
            return (
                `https://www.cheapflights.ca/flight-search/${this.originAirportCode}-${this.destinationAirportCode}/${this.departureYear}-${this.departureMonth}-${this.departureDay}${this.#class}?sort=bestflight_a`
            );
        };
        // if(this.multiCity) {
        //     return (
        //         `https://www.cheapflights.ca/flight-search/${this.originAirportCode}-${this.destinationAirportCode}/2024-11-10/JFK-LAX/2024-11-11/LAX-YMQ/2024-12-12?sort=bestflight_a`
        //     );
        // };
        return (
            `https://www.cheapflights.ca/flight-search/${this.originAirportCode}-${this.destinationAirportCode}/${this.departureYear}-${this.departureMonth}-${this.departureDay}/${this.returnYear}-${this.returnMonth}-${this.returnDay}${this.#class}?sort=price_a`
        );
    }

    set class(value) {
        const _classes = {
            "economy" : "",
            "premium" : "/premium",
            "business" : "/business",
            "first" : "/first",
        }

        const _value = _classes[value] !== undefined ? _classes[value] : null;

        const classes = ["", "premium", "business", "first"];
        
        if (!classes.includes(_value)) {
            this.#class = classes[0];
        } else {
            this.#class = _value;
        };
    }

    setDelay({ delay }) {
        this.delay = delay;
    }
    async Scrape() {
        const url = this.getUrl();

        const web = new WebScraping({ delay:this.delay, url:url });

        await web.launchBrowser({ headless:this.headless, viewPort:false });

        await web.newPage();

        await web.goTo({ waitUntil:'networkidle2' });

        await web.waitDelay(10000);

        const priceElement = await web.getElementByText('.f8F1-price-text');

        await web.finalize();

        const price = await web.getPrice(priceElement);

        const siteUrl = web.getUrl();

        return { site: "Cheapflights", price: `$${price}`, url: siteUrl, adultNumber: this.adultNumber, class: this.#class };
    }
};

module.exports = Cheapflights;

