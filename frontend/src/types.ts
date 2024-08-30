export interface AirportData {
    [key: string]: {
        country: string;
        airportCode: string;
    }
}

export interface skyscannerFetchData {
    Site: string,
    Airline: string,
    DepartureInfo: {
        Duration: string,
        Stop: string,
    },
    ReturnInfo: {
        Duration: string,
        Stop: string,
    },
    Price: string,
    Url: string,
    AdultNumber: string | number,
    ClassFlight: string,
}

export interface skyscannerData {
    site: string,
    texts: skyscannerTextsData[],
    url: string,
    adultNumber: string | number,
    classFlight: string,
}

export interface skyscannerTextsData {
        price: string,
        img: string,
        airline: string,
        departureData: {
            time: string;
            duration: string,
            stop: string,
        },
        returnData: {
            time: string;
            duration: string,
            stop: string,
            },
}

export interface flighthubFetchData {
    Site: string,
    DepartureInfo: {
        Airline: string,
        Duration: string,
        CombinedTime: string,
    },
    ReturnInfo: {
        Airline: string,
        Duration: string,
        CombinedTime: string,
        },
    Price: string,
    Url: string,
    AdultNumber: string | number,
    ClassFlight: string,
}

export interface flighthubData {
    site: string,
    texts: flighthubTextsData[],
    url: string,
    adultNumber: string | number,
    classFlight: string,
}

export interface flighthubTextsData {
    Airline?: any[], //TODO 
    Departure: {
        img: string,
        airline: string,
        duration: string,
        combinedTime: string,
    },
    returnData: {
        img: string,
        airline: string,
        duration: string,
        combinedTime: string,
    },
    Price: string,
}

export interface cheapflightsFetchData {
    Site: string,
    Airline: string,
    Departure: {
        Duration: string,
        Stop: string
    },
    Return: {
        Duration: string,
        Stop: string
    },
    Price: string,
}

export interface cheapflightsData {
    site: string,
    texts: flighthubTextsData[],
    url: string,
    adultNumber: string | number,
    classFlight: string,
}

export interface cheapflightsTextsData {
    price: string,
    img: string,
    airline: string,
    departureData: {
        time: string,
        stop: string,
        duration: string,
    },
    returnData: {
        time: string,
        stop: string,
        duration: string,
    },
}

