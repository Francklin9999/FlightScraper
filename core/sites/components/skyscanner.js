const WebScraping = require('../../webScraping');
const FlightScraper = require('../flightScraper');

class Skyscanner extends FlightScraper {

    #class;
    #delay;
    #web;
    #url;

    constructor(data) {
        super(data)
        this.#class = data.class;
        this.#delay = data.delay;
        this.#url = this.getUrl()
        this.#web = new WebScraping({ delay:this.#delay, defaultUrl:'https://www.skyscanner.ca/', url: this.#url });
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

    set delay(value) {
        value = parseInt(value);
        if (isNaN(value) && value > 0) {
            this.#delay = value;
        }
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


    async Scrape() {
        try {

            await this.#web.launchBrowser({ headless:this.headless, viewPort:false });

            await this.#web.defaultRoute();

            await this.#web.goTo({ waitUntil:'networkidle2' });

            // await this.#web.page.waitForSelector('.TimeWithOffsetTooltip_timeComplex__YTBlO');

            const texts = await this.#web.page.evaluate(() => {
                const results = [];

                const elements = document.querySelectorAll('.EcoTicketWrapper_itineraryContainer__M2Q0Z');
                
                elements.forEach(element => {
                    const price = element.querySelector('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--lg__ZTY1M')?.textContent.trim() || '';
                    const img = element.querySelector('.BpkImage_bpk-image__img__MmI5Z')?.getAttribute('src') || '';
                    const airline = element.querySelector('.LogoImage_container__ZjFjY.UpperTicketBody_ticketLogo__ZThiM span.BpkText_bpk-text__ODgwN.BpkText_bpk-text--xs__MWRhZ')?.textContent.trim() || '';

                    const dataElements = element.querySelectorAll('.LegInfo_legInfo__ZDQwZ');
                    const dataArr = Array.from(dataElements).map(el => {
                        const time1 = el.querySelector('.LegInfo_routePartialDepart__MDFkN')?.textContent.trim() || '';
                        const time2 = el.querySelector('.LegInfo_routePartialArrive__ZmRjO')?.textContent.trim() || '';
                        const offset = el.querySelector('.TimeWithOffsetTooltip_offsetTooltipContainer__YWI4Z .BpkText_bpk-text__ODgwN.BpkText_bpk-text--caption__MDcxN')?.textContent.trim() || '';
                        const time = `${time1} - ${time2}${offset}`;
                        const duration = el.querySelector('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--caption__MDcxN.Duration_duration__ZjQ0Z')?.textContent.trim() || '';
                        const stop = el.querySelector('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--xs__MWRhZ.LegInfo_stopsLabelRed__MWRmM')?.textContent.trim() || '';

                        return { time, duration, stop };
                    });
        
                    results.push({
                        Airline: airline,
                        Departure: {
                            Duration: dataArr[0].duration,
                            Stop: dataArr[0].stop || 'NonStop'
                        },
                        Return: {
                            Duration: dataArr[1].duration,
                            Stop: dataArr[1].stop || 'NonStop'
                        },
                        Price: price,
                    });
                });
        
                return results;
            });

            await this.#web.finalize();

            return { site: "SkyScanner", texts: texts, url: this.#url, adultNumber: this.adultNumber, class: this.#class };

        } catch (error) {
            return null;
        };
    
        };
};

module.exports = Skyscanner;

// const text = $('.EcoTicketWrapper_itineraryContainer__M2Q0Z').map((index, element) => {
//     const price = $(element).find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--lg__ZTY1M').text();
//     const img = $(element).find('.BpkImage_bpk-image__img__MmI5Z').attr('src');
//     const airline = $(element).find('.LogoImage_container__ZjFjY.UpperTicketBody_ticketLogo__ZThiM').find('span.BpkText_bpk-text__ODgwN.BpkText_bpk-text--xs__MWRhZ').text().trim();
//     const data = $(element).find('.LegInfo_legInfo__ZDQwZ').map((index, element) => {
//         const time1 = $(element).find('.LegInfo_routePartialDepart__MDFkN').find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--label-1__Zjc0Z.TimeWithOffsetTooltip_timeComplex__YTBlO').text();
//         const time2 = $(element).find('.LegInfo_routePartialArrive__ZmRjO').find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--label-1__Zjc0Z.TimeWithOffsetTooltip_timeComplex__YTBlO').text();
//         const isOffset = $(element).find('.TimeWithOffsetTooltip_offsetTooltipContainer__YWI4Z').find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--caption__MDcxN');
//         const offset = isOffset.length > 0 ? $(isOffset).text() : '';
//         const time = `${time1} - ${time2}${offset}`;
//         const duration = $(element).find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--caption__MDcxN.Duration_duration__ZjQ0Z').text();
//         const stop = $(element).find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--xs__MWRhZ.LegInfo_stopsLabelRed__MWRmM').text();
//         return { time, duration, stop };
//     });

//     return { price, img, airline, departureData: data[0] || '', returnData: data[1] || ''};
// })
// console.log(text)

            // const html = await web.page.content();

            // const $ = cheerio.load(html);

            // const texts = $('.EcoTicketWrapper_itineraryContainer__M2Q0Z').map((index, element) => {
            //     const price = $(element).find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--lg__ZTY1M').text();
            //     const img = $(element).find('.BpkImage_bpk-image__img__MmI5Z').attr('src');
            //     const airline = $(element).find('.LogoImage_container__ZjFjY.UpperTicketBody_ticketLogo__ZThiM').find('span.BpkText_bpk-text__ODgwN.BpkText_bpk-text--xs__MWRhZ').text().trim();
            //     const data = $(element).find('.LegInfo_legInfo__ZDQwZ').map((index, element) => {
            //         const time1 = $(element).find('.LegInfo_routePartialDepart__MDFkN').find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--label-1__Zjc0Z.TimeWithOffsetTooltip_timeComplex__YTBlO').text();
            //         const time2 = $(element).find('.LegInfo_routePartialArrive__ZmRjO').find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--label-1__Zjc0Z.TimeWithOffsetTooltip_timeComplex__YTBlO').text();
            //         const isOffset = $(element).find('.TimeWithOffsetTooltip_offsetTooltipContainer__YWI4Z').find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--caption__MDcxN');
            //         const offset = isOffset.length > 0 ? $(isOffset).text() : '';
            //         const time = `${time1} - ${time2}${offset}`;
            //         const duration = $(element).find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--caption__MDcxN.Duration_duration__ZjQ0Z').text();
            //         const stop = $(element).find('.BpkText_bpk-text__ODgwN.BpkText_bpk-text--xs__MWRhZ.LegInfo_stopsLabelRed__MWRmM').text();
            //         return { time, duration, stop };
            //     });

            //     return { price, img, airline, departureData: data[0] || '', returnData: data[1] || ''};
            // });