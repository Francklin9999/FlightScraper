"use client"

import { flighthubData, flighthubFetchData, flighthubTextsData } from "@/types";

export default async function flighthubFetch(params: any) {
    const url = 'https://localhost:3000/api/flighthub';
    try {
        const queryParams = new URLSearchParams(params as any).toString();
        const response = await fetch(`${url}?${queryParams}`);
        const data: any = await response.json();
        const flighthubData: flighthubFetchData[] = transformData(data);
        return flighthubData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function transformData(data: flighthubData): flighthubFetchData[] {
    return data.texts.map((flight: flighthubTextsData) => {
        const site = data.site;
        const departureInfo = [flight.departureData.airline, flight.departureData.duration, flight.departureData.combinedTime];
        const returnInfo = [flight.returnData.airline, flight.returnData.duration, flight.returnData.combinedTime];
        const price = flight.price;
        const url = data.url;
        const adultNumber = data.adultNumber;
        const classFlight = data.classFlight;
        return {
            Site: site,
            DepartureInfo: {
                Airline: departureInfo[0],
                Duration: departureInfo[1],
                CombinedTime: departureInfo[2],
            },
            ReturnInfo: {
                Airline: returnInfo[0],
                Duration: returnInfo[1],
                CombinedTime: returnInfo[2],
            },
            Price: price,
            Url: url,
            AdultNumber: adultNumber,
            ClassFlight: classFlight,
        }
    });
}