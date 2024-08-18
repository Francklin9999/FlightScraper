export interface AirportData {
    [key: string]: {
        country: string;
        airportCode: string;
    }
}

export interface skyscannerFetchData {
    Site: string;
    Airline: string,
    DepartureInfo: {
        Duration: string,
        Stop: string
    },
    ReturnInfo: {
        Duration: string,
        Stop: string
    },
    Price: string,
    Url: string,
    AdultNumber: string | number,
    ClassFlight: string;
}

export interface skyscannerData {
    site: string,
    texts: [
        {
        price: string,
        img: string,
        airline: string,
        departureData: {
            time: string;
            duration: string,
            stop: string | null,
        },
        returnData: {
            time: string;
            duration: string,
            stop: string | null,
            },
        }
    ],
    url: string,
    adultNumber: string | number,
    classFlight: string,
}

export interface flighthubFetchData {
    Airline: {
        1: string,
        2: string
    },
    Departure: {
        Duration: string,
    },
    Return: {
        Duration: string,
        },
    Price: string,
}

  export interface cheapflightsFetchData {
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