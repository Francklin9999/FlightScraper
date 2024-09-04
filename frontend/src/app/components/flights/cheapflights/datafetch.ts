"use client"

import { cheapflightsData, cheapflightsFetchData, cheapflightsTextsData } from "@/types";

export default async function cheapflightsFetch(params: any) {
    const url = 'http://localhost:8080/api/cheapflights';
    try {
        // const queryParams = new URLSearchParams(params as any).toString();
        // const response = await fetch(`${url}${queryParams}`);
        // const data: any = await response.json();
        const data: any = JSON.parse(JSON.stringify(testData));
        const cheapflightsData: cheapflightsFetchData[] = transformData(data);
        return cheapflightsData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function transformData(data: cheapflightsData): cheapflightsFetchData[] {
    return data.texts.map((flight: cheapflightsTextsData) => {
        const site = data.site;
        const airline = flight.Airline;
        const departureInfo = [flight.Departure.Duration, flight.Departure.Stop, flight.Departure.Time];
        const returnInfo = [flight.Return.Duration, flight.Return.Stop, flight.Return.Time];
        const price = flight.Price;
        const url = data.url;
        const adultNumber = data.adultNumber;
        const classFlight = data.class;
        return {
            Site: site,
            Airline: airline,
            DepartureInfo: {
                Duration: departureInfo[0],
                Stop: departureInfo[1],
                CombinedTime: departureInfo[2],
            },
            ReturnInfo: {
                Duration: returnInfo[0],
                Stop: returnInfo[1],
                CombinedTime: returnInfo[2],
            },
            Price: price,
            Url: url,
            AdultNumber: adultNumber,
            ClassFlight: classFlight || 'Economy',
        }
    });
}

// 20240903204924
// http://localhost:8080/api/cheapflights?origin=Montreal%20-%20Dorval%20(Montr%C3%A9al-Trudeau)%20-%20YUL&destination=New%20York%20-%20John%20F.%20Kennedy%20(NY)%20-%20JFK&departure=2024-10-09&return=2024-11-09&adults=1%20Adult&class=Economy&headless=true

const testData = {
    "site": "Cheapflights",
    "texts": [
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "1h 57m",
          "Stop": "direct",
          "Time": "7:30 pm – 9:27 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 273"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "1h 57m",
          "Stop": "direct",
          "Time": "7:30 pm – 9:27 pm"
        },
        "Return": {
          "Duration": "4h 58m",
          "Stop": "1 stop",
          "Time": "3:55 pm – 8:53 pm"
        },
        "Price": "C$ 281"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "1h 57m",
          "Stop": "direct",
          "Time": "7:30 pm – 9:27 pm"
        },
        "Return": {
          "Duration": "5h 23m",
          "Stop": "1 stop",
          "Time": "3:55 pm – 9:18 pm"
        },
        "Price": "C$ 281"
      },
      {
        "Airline": "United Airlines",
        "Departure": {
          "Duration": "1h 57m",
          "Stop": "direct",
          "Time": "7:30 pm – 9:27 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 302"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "1h 57m",
          "Stop": "direct",
          "Time": "7:30 pm – 9:27 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 307"
      },
      {
        "Airline": "United Airlines",
        "Departure": {
          "Duration": "1h 57m",
          "Stop": "direct",
          "Time": "7:30 pm – 9:27 pm"
        },
        "Return": {
          "Duration": "4h 58m",
          "Stop": "1 stop",
          "Time": "3:55 pm – 8:53 pm"
        },
        "Price": "C$ 310"
      },
      {
        "Airline": "United Airlines",
        "Departure": {
          "Duration": "1h 57m",
          "Stop": "direct",
          "Time": "7:30 pm – 9:27 pm"
        },
        "Return": {
          "Duration": "5h 23m",
          "Stop": "1 stop",
          "Time": "3:55 pm – 9:18 pm"
        },
        "Price": "C$ 310"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "9h 10m",
          "Stop": "1 stop",
          "Time": "1:10 pm – 10:20 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 330"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "4h 50m",
          "Stop": "1 stop",
          "Time": "10:10 am – 3:00 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 337"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "5h 50m",
          "Stop": "1 stop",
          "Time": "9:10 am – 3:00 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 337"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "6h 50m",
          "Stop": "1 stop",
          "Time": "8:10 am – 3:00 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 337"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "7h 05m",
          "Stop": "2 stops",
          "Time": "7:55 am – 3:00 pm"
        },
        "Return": {
          "Duration": "1h 27m",
          "Stop": "direct",
          "Time": "10:05 am – 11:32 am"
        },
        "Price": "C$ 337"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "4h 50m",
          "Stop": "1 stop",
          "Time": "10:10 am – 3:00 pm"
        },
        "Return": {
          "Duration": "4h 58m",
          "Stop": "1 stop",
          "Time": "3:55 pm – 8:53 pm"
        },
        "Price": "C$ 345"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "4h 50m",
          "Stop": "1 stop",
          "Time": "10:10 am – 3:00 pm"
        },
        "Return": {
          "Duration": "5h 23m",
          "Stop": "1 stop",
          "Time": "3:55 pm – 9:18 pm"
        },
        "Price": "C$ 345"
      },
      {
        "Airline": "Air Canada",
        "Departure": {
          "Duration": "5h 50m",
          "Stop": "1 stop",
          "Time": "9:10 am – 3:00 pm"
        },
        "Return": {
          "Duration": "4h 58m",
          "Stop": "1 stop",
          "Time": "3:55 pm – 8:53 pm"
        },
        "Price": "C$ 345"
      }
    ],
    "url": "https://www.cheapflights.ca/flight-search/YUL-JFK/2024-10-09/2024-11-09economy?sort=price_a",
    "adultNumber": 1,
    "class": "economy"
  }