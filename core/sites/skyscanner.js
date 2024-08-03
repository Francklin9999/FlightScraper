const WebScraping = require('../modal');

class Skyscanner {

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
        this.class= data["class"] || "economy";
        this.oneWay = data["oneWay"] || null;
        this.headless = data["headless"] || false;
        this.delay = data["delay"] || 3333;
    }

    getUrl() {
        if(this.oneWay) {
            return (
                `https://www.skyscanner.ca/transport/vols/${this.originAirportCode}/${this.destinationAirportCode}/${this.departureYear}${this.departureMonth}${this.departureDay}/?adults=1&adultsv2=1&cabinclass=${this.#class}&children=0&childrenv2=&inboundaltsenabled=false&infants=0&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=0`
            );
        };
                return (
            `https://www.skyscanner.ca/transport/vols/${this.originAirportCode}/${this.destinationAirportCode}/${this.departureYear}${this.departureMonth}${this.departureDay}/${this.returnYear}${this.returnMonth}${this.returnDay}/?adultsv2=1&cabinclass=${this.#class}&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false`
        );
    }

    set class(value) {
        const _classes = {
            "economy" : "Economy",
            "premium" : "premium_economy",
            "business" : "business",
            "first" : "first",
        }

        const _value = _classes[value] !== undefined ? _classes[value] : null;

        const classes = ["Economy", "premium_economy", "business", "first"];

        if (!classes.includes(value)) {
            this.#class = classes[0];
        } else {
            this.#class = _value;
        };
    };

    setDelay(delay) {
        this.delay = delay;
    }
    async Scrape() {
        const url = this.getUrl();

        const web = new WebScraping({ delay:this.delay, url:url });

        await web.launchBrowser({ headless:this.headless, viewPort:false });

        await web.newPage();

        await web.goTo({ waitUntil:'networkidle2' });

        await web.waitDelay(25000);

        const priceElement = await web.getElementByText('.Price_fqsTabWithSparklePriceSelected__NWFlZ');

        await web.finalize();

        const price = await web.getPrice(priceElement);

        const siteUrl = web.getUrl();

        return { site: "SkyScanner", price: `$${price}`, url: siteUrl, adultNumber: this.adultNumber, class: (this.#class == null || this.#class == undefined) ? "economy" : null };

    }
};

module.exports = Skyscanner;


