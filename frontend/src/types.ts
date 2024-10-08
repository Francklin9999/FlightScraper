export interface AirportData {
    [key: string]: {
        country: string;
        airportCode: string;
    }
}

export interface skyscannerFetchData {
    Site: string,
    Airline: string,
    Img: string,
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
    Airline: string,
    Img: string,
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
    Price: string,
}

export interface flighthubFetchData {
    Site: string,
    DepartureInfo: {
        Airline: string,
        Duration: string,
        CombinedTime: string,
        Img: string,
    },
    ReturnInfo: {
        Airline: string,
        Duration: string,
        CombinedTime: string,
        Img: string,
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
        Airline: string,
        Duration: string,
        Time: string,
        Img: string,
    },
    Return: {
        Airline: string,
        Duration: string,
        Time: string,
        Img: string,
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
        Img: string,
    },
    ReturnInfo: {
        Duration: string,
        Stop: string,
        CombinedTime: string,
        Img: string,
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
        Img: string,
    },
    Return: {
        Duration: string,
        Stop: string,
        Time: string,
        Img: string,
    },
    Price: string,
}

