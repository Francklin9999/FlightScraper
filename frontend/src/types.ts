export interface AirportData {
    [key: string]: {
        country: string;
        airportCode: string;
    }
}

export interface skyscannerFetchData {
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