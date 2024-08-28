import { cheapflightsFetchData, flighthubFetchData, skyscannerFetchData } from "./types";

export function isSkyscannerFetchData(entry: any): entry is skyscannerFetchData {
    return (
        typeof entry.Site === 'string' &&
        typeof entry.Airline === 'string' &&
        entry.DepartureInfo &&
        typeof entry.DepartureInfo.Duration === 'string' &&
        typeof entry.DepartureInfo.Stop === 'string' &&
        entry.ReturnInfo &&
        typeof entry.ReturnInfo.Duration === 'string' &&
        typeof entry.ReturnInfo.Stop === 'string' &&
        typeof entry.Price === 'string' &&
        typeof entry.Url === 'string' &&
        (typeof entry.AdultNumber === 'string' || typeof entry.AdultNumber === 'number') &&
        typeof entry.ClassFlight === 'string'
    );
}

export function isFlighthubFetchData(entry: any): entry is flighthubFetchData {
    return (
        typeof entry.Site === 'string' &&
        entry.DepartureInfo &&
        typeof entry.DepartureInfo.Airline === 'string' &&
        typeof entry.DepartureInfo.Duration === 'string' &&
        typeof entry.DepartureInfo.CombinedTime === 'string' &&
        entry.ReturnInfo &&
        typeof entry.ReturnInfo.Airline === 'string' &&
        typeof entry.ReturnInfo.Duration === 'string' &&
        typeof entry.ReturnInfo.CombinedTime === 'string' &&
        typeof entry.Price === 'string' &&
        typeof entry.Url === 'string' &&
        (typeof entry.AdultNumber === 'string' || typeof entry.AdultNumber === 'number') &&
        typeof entry.ClassFlight === 'string'
    );
}

export function isCheapflightsFetchData(entry: any): entry is cheapflightsFetchData {
    return (
        typeof entry.Site === 'string' &&
        typeof entry.Airline === 'string' &&
        entry.Departure &&
        typeof entry.Departure.Duration === 'string' &&
        typeof entry.Departure.Stop === 'string' &&
        entry.Return &&
        typeof entry.Return.Duration === 'string' &&
        typeof entry.Return.Stop === 'string' &&
        typeof entry.Price === 'string'
    );
}
