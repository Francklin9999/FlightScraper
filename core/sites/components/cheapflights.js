const WebScraping = require('../../webScraping');
const FlightScraper = require('../flightScraper');

class Cheapflights extends FlightScraper {

    #class;
    #delay;
    #web;
    #url;

    constructor(data) {
        super(data)
        this.#class = data.class;
        this.#delay = data.delay;
        this.#url = this.getUrl()
        this.#web = new WebScraping({ delay:this.#delay, defaultUrl:'https://www.cheapflights.ca/', url: this.#url });
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

    set delay(value) {
        value = parseInt(value);
        if (isNaN(value) && value > 0) {
            this.#delay = value;
        }
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

    async Scrape() {
        try {

            await this.#web.launchBrowser({ headless:this.headless, viewPort:false });

            await this.#web.defaultRoute();

            await this.#web.goTo({ waitUntil:'networkidle2' });

            const texts = await this.#web.page.evaluate(() => {
                const results = [];
                document.querySelectorAll('.nrc6-inner').forEach((element) => {
                    const price = element.querySelector('.f8F1-price-text') ? element.querySelector('.f8F1-price-text').textContent.trim() : '';
                    const img = element.querySelector('img') ? element.querySelector('img').getAttribute('src') : '';
                    const airline = element.querySelector('img') ? element.querySelector('img').getAttribute('alt') : '';
        
                    const data = Array.from(element.querySelectorAll('.c3J0r-container')).map(container => {
                        const time = container.querySelector('.vmXl.vmXl-mod-variant-large') ? container.querySelector('.vmXl.vmXl-mod-variant-large').textContent.trim() : '';
                        const duration = Array.from(container.querySelectorAll('.vmXl.vmXl-mod-variant-default')).map(d => d.textContent.trim());
        
                        return {
                            time,
                            stop: duration[0] || '',
                            duration: duration[1] || ''
                        };
                    });
        
                    const departureData = data[0] || { time: '', stop: '', duration: '' };
                    const returnData = data[1] || { time: '', stop: '', duration: '' };
        
                    // results.push({
                    //     price,
                    //     img,
                    //     airline,
                    //     departureData,
                    //     returnData
                    // });

                    results.push({
                        Airline: airline,
                        Departure: {
                            Duration: departureData[2],
                            Stop: departureData[1]
                        },
                        Return: {
                            Duration: returnData[2],
                            Stop: returnData[1]
                        },
                        Price: price,
                    });
                });
                return results;
            });

            await this.#web.finalize();

            return { site: "Cheapflights", texts: texts, url: this.#url, adultNumber: this.adultNumber, class: (this.#class == "") ? "Economy" : this.#class };
            
            } catch (error) {
                return null;
            };
        };
};

// const data2 = {
//     "origin" : "YUL",
//     "destination" : "DLA",
//     "departure" : ["18", "12", "2024"],
//     "return" : ["10", "01", "2025"],
//     "adults" : 1,
//     "class" : "economy",
//     "headless" : true,
// };

module.exports = Cheapflights;

// const texts = $('.package').map((index, element) => {
//     const price = $(element).find('.total-price').text();
//     const data = $(element).find('.city-pair').map((index, element) => {
//         const img = $(element).find('img').attr('src');
//         const airline = $(element).find('.carrier-name').text();
//         const duration = $(element).find('.flight-duration-column').text();
//         const time = $(element).find('.flight-time').map((index, element) => {
//             return $(element).text();
//         });
//         const combinedTime = time.join('-');
//         return { img, airline, duration, combinedTime }
//     });
//     return { price, departureData: data[0] || '', returnData: data[1] || '' };
// }).get();

// console.log(texts);

