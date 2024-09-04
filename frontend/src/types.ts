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
        Price: string,
        img: string,
        Airline: string | "helllo",
        Departure: {
            time: string;
            Duration: string,
            Stop: string,
        },
        Return: {
            time: string;
            Duration: string,
            Stop: string,
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
    Airline: {
        1: string,
        2: string,
    }, 
    Departure: {
        Image: string,
        Airline: string,
        Duration: string,
        Time: string,
    },
    Return: {
        Image: string,
        Airline: string,
        Duration: string,
        Time: string,
    },
    Price: string,
}

export interface cheapflightsFetchData {
    Site: string,
    Airline: string,
    DepartureInfo: {
        Duration: string,
        Stop: string,
        CombinedTime: string,
    },
    ReturnInfo: {
        Duration: string,
        Stop: string,
        CombinedTime: string,
    },
    Price: string,
    Url: string,
    AdultNumber: string | number,
    ClassFlight: string,
}

export interface cheapflightsData {
    site: string,
    texts: cheapflightsTextsData[],
    url: string,
    adultNumber: string | number,
    class: string,
}

export interface cheapflightsTextsData {
    Airline: string,
    Departure: {
        Duration: string,
        Stop: string,
        Time: string,
    },
    Return: {
        Duration: string,
        Stop: string,
        Time: string,
    },
    Price: string,
}

