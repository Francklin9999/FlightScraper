import { cheapflightsFetchData, flighthubFetchData, skyscannerFetchData } from "./types";

export function isSkyscannerFetchData(entry: any): entry is skyscannerFetchData {
    return entry satisfies skyscannerFetchData;
}

export function isFlighthubFetchData(entry: any): entry is flighthubFetchData {
    return entry satisfies flighthubFetchData;
}

export function isCheapflightsFetchData(entry: any): entry is cheapflightsFetchData {
    return entry satisfies cheapflightsFetchData;
}
