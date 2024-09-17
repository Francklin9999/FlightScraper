const WebScraping = require('../../webScraping');
const FlightScraper = require('../flightScraper');

class Flighthub extends FlightScraper {

    #class;
    #delay;
    #web;
    #url;

    constructor(data) {
        super(data)
        this.#class = data.class;
        this.#delay = data.delay;
        this.#url = this.getUrl()
        this.#web = new WebScraping({ delay:this.#delay, defaultUrl:'https://www.flighthub.com/#flights', url: this.#url });
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

    set delay(value) {
        value = parseInt(value);
        if (isNaN(value) && value > 0) {
            this.#delay = value;
        }
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

    async Scrape() {
        try {

            await this.#web.launchBrowser({ headless:this.headless, viewPort:false });

            // await this.#web.defaultRoute();

            await this.#web.goTo({ waitUntil:'networkidle2' });

            const texts = await this.#web.page.evaluate(() => {
                const results = [];
                
                document.querySelectorAll('.package').forEach(packageElement => {
                    const price = packageElement.querySelector('.total-price')?.textContent.replace(/\n/g, '').trim() || '';
                    const data = Array.from(packageElement.querySelectorAll('.city-pair')).map(cityPairElement => {
                        const img = cityPairElement.querySelector('img')?.getAttribute('src') || '';
                        const airline = cityPairElement.querySelector('.carrier-name')?.textContent.replace(/\n/g, '').trim() || '';
                        const duration = cityPairElement.querySelector('.flight-duration-column')?.textContent.replace(/\n/g, '').trim() || '';
                        const time = Array.from(cityPairElement.querySelectorAll('.flight-time')).map(timeElement => {
                            return timeElement.textContent.replace(/\n/g, '').trim();
                        });
                        const combinedTime = time.join('-');
                        return { img, airline, duration, combinedTime };
                    });
        
                    const departureData = data[0] || { img: '', airline: '', duration: '', combinedTime: '' };
                    const returnData = data[1] || { img: '', airline: '', duration: '', combinedTime: '' };
                    results.push({
                        Airline: {
                            1: departureData.airline,
                            2: returnData.airline
                        },
                        Departure: {
                            Airline: departureData.airline || '',
                            Duration: departureData.duration || '',
                            Time: departureData.combinedTime || '',
                            Img: departureData.img || '',
                        },
                        Return: {
                            Airline: returnData.airline || '',
                            Duration: returnData.duration || '',
                            Time: returnData.combinedTime || '',
                            Duration: returnData.duration || '',
                            Img: returnData.img || '',
                        },
                        Price: price,
                    });
                });
        
                return results;
            });

            await this.#web.finalize();

            return { site: "Flighthub", texts: texts, url: this.#url, adultNumber: this.adultNumber, class: this.#class };
        
        } catch (error) {
            return null;
        };
    };
};

module.exports = Flighthub;