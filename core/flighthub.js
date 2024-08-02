const WebScraping = require('./modal');
// import { cityToAirportCode } from 'airport-code.js';

class Flighthub {
    constructor(data) {
        this.originAirportCode = data["origin"];
        this.destinationAirportCode = data["destination"];
        this.departureDay = data["departure"][0];
        this.departureMonth = data["departure"][1];
        this.departureYear = data["departure"][2];
        this.returnDay = data["return"][0];
        this.returnMonth = data["return"][1];
        this.returnYear = data["return"][2];
        this.delay = 3333;
    }

    getUrl() {
        return (
            `https://www.flighthub.com/flight/search?num_adults=1&num_children=0&num_infants=0&num_infants_lap=0&seat_class=Economy&type=roundtrip&campaign=1&seg0_from=${this.originAirportCode}&seg0_to=${this.destinationAirportCode}&seg0_date=${this.departureYear}-${this.departureMonth}-${this.departureDay}&seg1_date=${this.returnYear}-${this.returnMonth}-${this.returnDay}&seg1_from=${this.destinationAirportCode}&seg1_to=${this.originAirportCode}`
        );
        
    }

    setDelay(delay) {
        this.delay = delay;
    }

    async Scrape() {
        console.log('Flighthub');

        const url = this.getUrl();

        const web = new WebScraping(this.delay, url);

        await web.launchBrowser(false, false);

        await web.newPage();

        await web.goTo('networkidle2');

        await web.waitDelay(10000);

        const priceElement = await web.getElementByText("a.tab-btn.cheapest");

        await web.getPrice(priceElement);

        web.getUrl();

        await web.finalize();
    }
}

module.exports = Flighthub;