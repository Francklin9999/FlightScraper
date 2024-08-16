class FlightScraper {

    class;
    delay;

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
        this.headless = data["headless"] || true;
        this.delay = data["delay"] || 3333;

    }
}

module.exports = FlightScraper;