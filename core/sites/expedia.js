const WebScraping = require('../modal');

class Expedia {

    #class;

    constructor(data) {
        this.originAirport = data["origin"];
        this.destinationAirport = data["destination"];
        this.departureDay = data["departure"][0];
        this.departureMonth = data["departure"][1];
        this.departureYear = data["departure"][2];
        this.returnDay = data["return"][0];
        this.returnMonth = data["return"][1];
        this.returnYear = data["return"][2];
        this.adultNumber = data["adult"] || 1;
        this.class= data["class"] || "economy";
        this.oneWay = data["oneWay"] || null;
        this.headless = data["headless"] || true;
        this.delay = data["delay"] || 1111;
    }

    set class(value) {
        const _classes = {
            "economy" : "economy",
            "premium" : "premium",
            "business" : "business",
            "first" : "first",
        }

        const _value = _classes[value] !== undefined ? _classes[value] : null;

        const classes = ["economy", "premium", "business", "first"];

        if (!classes.includes(_value)) {
            this.#class = classes[0];
        } else {
            this.#class = _value;
        };
    }

    getUrl() {
        if(this.oneWay) {
            return (
                `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=oneway&leg1=from:${this.originAirport},to:${this.destinationAirport},departure:${this.departureDay}/${this.departureMonth}/${this.departureYear}TANYT,fromType:U,toType:U&options=cabinclass:${this.#class}&fromDate=${this.departureDay}/${this.departureMonth}/${this.departureYear}&d1=${this.departureYear}-${this.departureMonth}-${this.departureDay}&passengers=adults:${this.adultNumber},infantinlap:N`
            );
        };
        return (
            `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:${this.originAirport},to:${this.destinationAirport},departure:${this.departureDay}/${this.departureMonth}/${this.departureYear}TANYT,fromType:U,toType:U&leg2=from:${this.destinationAirport},to:${this.originAirport},departure:${this.returnDay}/${this.returnMonth}/${this.returnYear}TANYT,fromType:U,toType:U&options=cabinclass:${this.#class}&fromDate=${this.departureDay}/${this.departureMonth}/${this.departureYear}&toDate=${this.returnDay}/${this.returnMonth}/${this.returnYear}&d1=${this.departureYear}-${this.departureMonth}-${this.departureDay}&d2=${this.returnYear}-${this.returnMonth}-${this.returnDay}&passengers=adults:${this.adultNumber},infantinlap:N`
        );
    }

    setDelay(delay) {
        this.delay = delay;
    }

    async getPrice(priceElement) {
        let price = null;
        const pattern = /\$([\d,]+)/;
        price = WebScraping.regex(pattern, priceElement);
        if(price === null) {
            price = 'Not found';
        } else {
            price = price[1];
        };
        
        return price;
    }

    async Scrape() {
        try {
            const url = this.getUrl();

            const web = new WebScraping({ delay:this.delay, url:url });

            await web.launchBrowser({ headless:this.headless, viewPort:false });

            await web.newPage();

            await web.goTo({ waitUntil:'networkidle2' });

            const priceElement = await web.getElementByText('[stid="FLIGHTS_DETAILS_AND_FARES-index-1-leg-0-fsr-FlightsActionButton"]');

            await web.finalize();

            const price = await this.getPrice(priceElement);

            const siteUrl = web.getUrl();

            return { site: "Expedia", price: `$${price}`, url: siteUrl, adultNumber: this.adultNumber, class: this.#class };
        
            } catch (error) {
                return
            };
        };
};

module.exports = Expedia;
