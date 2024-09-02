"use client"

import { skyscannerData, skyscannerFetchData, skyscannerTextsData } from "@/types";
import { skyscannerData as testData } from '../../../../../../testData.js';

export default async function skyscannerFetch(params: any) {
    const url = 'http://localhost:8080/api/skyscanner';
    try {
        // const queryParams = new URLSearchParams(params as any).toString();
        // const response = await fetch(`${url}?${queryParams}`);
        // const data: any = await response.json();
        const data: any = JSON.parse(JSON.stringify(testData))
        const skyscannerData : skyscannerFetchData[] = transformData(data);
        return skyscannerData;
    } catch(error) {
        console.error(error);
        return null;
    }
}

function transformData(data: skyscannerData): skyscannerFetchData[] {
    return data.texts.map((flight: skyscannerTextsData) => {
        const site = data.site;
        const airline = flight.Airline;
        const departureInfo = [flight.Departure.Duration, flight.Departure.Stop]; 
        const returnInfo = [flight.Return.Duration, flight.Return.Stop]; 
        const price = flight.Price; 
        const url = data.url;
        const adultNumber = data.adultNumber;
        const classFlight = data.classFlight;

        return {
            Site: site,
            Airline: airline,
            DepartureInfo: {
                Duration: departureInfo[0],
                Stop: departureInfo[1] || 'NonStop',
            },
            ReturnInfo: {
                Duration: returnInfo[0],
                Stop: returnInfo[1] || 'NonStop',
            },
            Price: price,
            Url: url,
            AdultNumber: adultNumber,
            ClassFlight: classFlight,
        };
    });
}
