const WebScraping = require('./modal');

class Expedia {
    constructor(data) {
        this.originAirport = data["origin"];
        this.destinationAirport = data["destination"];
        this.departureDay = data["departure"][0];
        this.departureMonth = data["departure"][1];
        this.departureYear = data["departure"][2];
        this.returnDay = data["return"][0];
        this.returnMonth = data["return"][1];
        this.returnYear = data["return"][2];
        this.delay = 1111;
    }

    getUrl() {
        return (
            `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:${this.originAirport},to:${this.destinationAirport},departure:${this.departureDay}/${this.departureMonth}/${this.departureYear}TANYT,fromType:U,toType:U&leg2=from:${this.destinationAirport},to:${this.originAirport},departure:${this.returnDay}/${this.returnMonth}/${this.returnYear}TANYT,fromType:U,toType:U&options=cabinclass:economy&fromDate=${this.departureDay}/${this.departureMonth}/${this.departureYear}&toDate=${this.returnDay}/${this.returnMonth}/${this.returnYear}&d1=${this.departureYear}-${this.departureMonth}-${this.departureDay}&d2=${this.returnYear}-${this.returnMonth}-${this.returnDay}&passengers=adults:1,infantinlap:N`
        );
    }

    setDelay(delay) {
        this.delay = delay;
    }

    async Scrape() {
        console.log('Expedia');

        const url = this.getUrl();

        const web = new WebScraping(1111, url);

        await web.launchBrowser(true, false);

        await web.newPage();

        await web.goTo('networkidle2');

        const priceElement = await web.getElementByText('[stid="FLIGHTS_DETAILS_AND_FARES-index-1-leg-0-fsr-FlightsActionButton"]');

        await web.getPrice(priceElement);

        const link = web.getUrl;

        console.log("URL: " + link);

        await web.finalize();
    }
};

module.exports = Expedia;
