const WebScraping = require('./modal');

class Cheapflights {
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
            `https://www.cheapflights.ca/flight-search/${this.originAirportCode}-${this.destinationAirportCode}/${this.departureYear}-${this.departureMonth}-${this.departureDay}/${this.returnYear}-${this.returnMonth}-${this.returnDay}?sort=price_a`
        );
    }

    setDelay(delay) {
        this.delay = delay;
    }
    async Scrape() {
        console.log();
        console.log('Cheapflights');
        console.log();

        const url = this.getUrl();

        const web = new WebScraping(1111, url);

        await web.launchBrowser(false, false);

        await web.newPage();

        await web.goTo('networkidle2');

        await web.waitDelay(10000);

        const priceElement = await web.getElementByText('.f8F1-price-text');

        await web.getPrice(priceElement);

        web.getUrl();

        await web.finalize();
    }
};

module.exports = Cheapflights;

