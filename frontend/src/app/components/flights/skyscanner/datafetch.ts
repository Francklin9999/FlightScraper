"use client"

import { skyscannerData, skyscannerFetchData, skyscannerTextsData } from "@/types";

export default async function skyscannerFetch(params: any) {
    const url = 'http://localhost:8080/api/skyscanner';
    try {
        const queryParams = new URLSearchParams(params as any).toString();
        const response = await fetch(`${url}?${queryParams}`);
        const data: any = await response.json();
        // const data: any = JSON.parse(JSON.stringify(testData));
        const skyscannerData : skyscannerFetchData[] = transformData(data);
        return skyscannerData;
    } catch(error) {
        console.error(error);
        return;
    }
}

function transformData(data: skyscannerData): skyscannerFetchData[] {
    return data.texts.map((flight: skyscannerTextsData) => {
        const site = data.site;
        const airline = flight.Airline;
        const img = flight.Img;
        const departureInfo = [flight.Departure.Duration, flight.Departure.Stop]; 
        const returnInfo = [flight.Return.Duration, flight.Return.Stop]; 
        const price = flight.Price; 
        const url = data.url;
        const adultNumber = data.adultNumber;
        const classFlight = data.classFlight;

        return {
            Site: site,
            Airline: airline,
            Img: img,
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

// 20240902002247
// http://localhost:8080/api/skyscanner?origin=Montreal%20-%20Dorval%20(Montr%C3%A9al-Trudeau)%20-%20YUL&destination=New%20York%20-%20John%20F.%20Kennedy%20(NY)%20-%20JFK&departure=2024-10-09&return=2024-11-09&adults=1%20Adult&class=Economy&headless=true

const testData = {
    "site": "SkyScanner",
    "texts": [
      {
        "Airline": "WestJet",
        "Departure": {
          "Duration": "1h 46",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 55",
          "Stop": "1 stop"
        },
        "Price": "C$484"
      },
      {
        "Airline": "WestJet",
        "Departure": {
          "Duration": "1h 45",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 55",
          "Stop": "1 stop"
        },
        "Price": "C$490"
      },
      {
        "Airline": "WestJet",
        "Departure": {
          "Duration": "1h 46",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 55",
          "Stop": "1 stop"
        },
        "Price": "C$490"
      },
      {
        "Airline": "WestJet",
        "Departure": {
          "Duration": "1h 45",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 28",
          "Stop": "1 stop"
        },
        "Price": "C$525"
      },
      {
        "Airline": "WestJet",
        "Departure": {
          "Duration": "1h 46",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 28",
          "Stop": "1 stop"
        },
        "Price": "C$525"
      },
      {
        "Airline": "WestJet",
        "Departure": {
          "Duration": "1h 46",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 28",
          "Stop": "1 stop"
        },
        "Price": "C$519"
      },
      {
        "Airline": "Delta",
        "Departure": {
          "Duration": "1h 46",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 55",
          "Stop": "1 stop"
        },
        "Price": "C$917"
      },
      {
        "Airline": "Delta",
        "Departure": {
          "Duration": "1h 45",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 55",
          "Stop": "1 stop"
        },
        "Price": "C$962"
      },
      {
        "Airline": "Delta",
        "Departure": {
          "Duration": "1h 46",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 55",
          "Stop": "1 stop"
        },
        "Price": "C$962"
      },
      {
        "Airline": "Delta",
        "Departure": {
          "Duration": "1h 45",
          "Stop": "NonStop"
        },
        "Return": {
          "Duration": "4h 28",
          "Stop": "1 stop"
        },
        "Price": "C$1,018"
      }
    ],
    "url": "https://www.skyscanner.ca/transport/vols/YUL/JFK/20241009/20241109/?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false",
    "adultNumber": 1,
    "classFlight": "economy"
  }