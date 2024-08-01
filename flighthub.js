const WebScraping = require('./modal');
import { cityToAirportCode } from './const';

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

    set originAirportCode(city) {
        if(city.length > 3) {
            this.originAirportCode = cityToAirportCode[city];
        }
    }

    set destinationAirportCode(city) {
        if(city.length > 3) {
            this.destinationAirportCode = cityToAirportCode[city];
        }
    }

    getUrl() {
        return (
            `https://www.flighthub.com/flight/search?num_adults=1&num_children=0&num_infants=0&num_infants_lap=0&seat_
            class=Economy&type=roundtrip&campaign=1&seg0_from=${this.originAirportCode}&seg0_to=${this.destinationAirportCode}&seg0
            _date=${this.departureYear}-${this.departureMonth}-${this.departureDay}&seg1_date=${this.returnYear}-${this.returnMonth}-${this.returnDay}
            &seg1_from=${this.destinationAirportCode}&seg1_to=${this.originAirportCode}`
        );
    }

    setDelay(delay) {
        this.delay = delay;
    }

    async Scrape() {
        const url = this.getUrl();

        const web = new WebScraping(delay=this.delay, url=url);

        await web.launchBrowser(headless=false, viewPort=false);

        await web.newPage();

        await web.goTo(waitUntil='networkidle2');

        await web.waitDelay(15000);

        const priceElement = await web.getElementByText("a.tab-btn.cheapest");

        await web.getPrice(priceElement);

        web.getUrl;

        await web.finalize();
    }
}

module.exports = Flighthub;
