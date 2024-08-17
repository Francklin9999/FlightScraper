const WebScraping = require('../../webScraping');
const FlightScraper = require('../flightScraper');

class Expedia extends FlightScraper {

    #class;
    #delay;
    #web;
    #url;

    constructor(data) {
        super(data)
        this.#class = data.class;
        this.#delay = data.delay;
        this.#url = this.getUrl()
        this.#web = new WebScraping({ delay:this.#delay, defaultUrl:'https://www.expedia.ca/', url: this.#url });
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

    set delay(value) {
        value = parseInt(value);
        if (isNaN(value) && value > 0) {
            this.#delay = value;
        }
    }

    getUrl() {
        if(this.oneWay) {
            return (
                `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=oneway&leg1=from:${this.originAirportCode},to:${this.destinationAirportCode},departure:${this.departureDay}/${this.departureMonth}/${this.departureYear}TANYT,fromType:U,toType:U&options=cabinclass:${this.#class}&fromDate=${this.departureDay}/${this.departureMonth}/${this.departureYear}&d1=${this.departureYear}-${this.departureMonth}-${this.departureDay}&passengers=adults:${this.adultNumber},infantinlap:N`
            );
        };
        return (
            `https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:${this.originAirportCode},to:${this.destinationAirportCode},departure:${this.departureDay}/${this.departureMonth}/${this.departureYear}TANYT,fromType:U,toType:U&leg2=from:${this.destinationAirportCode},to:${this.originAirportCode},departure:${this.returnDay}/${this.returnMonth}/${this.returnYear}TANYT,fromType:U,toType:U&options=cabinclass:${this.#class}&fromDate=${this.departureDay}/${this.departureMonth}/${this.departureYear}&toDate=${this.returnDay}/${this.returnMonth}/${this.returnYear}&d1=${this.departureYear}-${this.departureMonth}-${this.departureDay}&d2=${this.returnYear}-${this.returnMonth}-${this.returnDay}&passengers=adults:${this.adultNumber},infantinlap:N`
        );
    }

    async Scrape() {
        try {

            await this.#web.launchBrowser({ headless:this.headless, viewPort:false });

            await this.#web.defaultRoute();

            await this.#web.goTo({ waitUntil:'networkidle2' });

            const text = await this.#web.page.evaluate(async () => {
                const elements = document.querySelectorAll('.uitk-card-link');
                const priceElement = document.querySelector('[stid="FLIGHTS_DETAILS_AND_FARES-index-1-leg-0-fsr-FlightsActionButton"]');
                return { info: Array.from(elements).map(element => element.textContent.trim()) };
            });

            await this.#web.finalize();

            const text_info = text.info.map(flightInfo => {
                const airlineMatch = flightInfo.match(/for (.*?) flight,/);
                const airline = airlineMatch ? airlineMatch[1] : "Airline not found";
              
                const departureMatch = flightInfo.match(/departing at (.*?) from/);
                const departureTime = departureMatch ? departureMatch[1] : "Departure time not found";
              
                const arrivalMatch = flightInfo.match(/arriving at (.*?) in/);
                const arrivalTime = arrivalMatch ? arrivalMatch[1] : "Arrival time not found";
              
                const stopMatch = flightInfo.includes("Nonstop") ? "Nonstop" : (flightInfo.match(/One stop/) ? "One stop" : "Stop information not found");
              
                const priceMatch = flightInfo.match(/Priced at (.*?) Roundtrip/);
                const price = priceMatch ? priceMatch[1] : "Price not found";
              
                return { Airline: airline, DepartureTime: departureTime, ArrivalTime: arrivalTime, Stops: stopMatch, Price: price };
              });

            return { site: "Expedia", texts: text_info, url: this.#url, adultNumber: this.adultNumber, class: (this.#class.charAt(0).toUpperCase() + this.#class.slice(1)) };
        
            } catch (error) {
                return null;
            };
        };
};

module.exports = Expedia;

// const data = $('.uitk-card-link').map((index, element) => {
//     return $(element).text();
// })
// console.log(data)
