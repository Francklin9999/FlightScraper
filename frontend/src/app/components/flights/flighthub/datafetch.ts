"use client"

import { flighthubData, flighthubFetchData, flighthubTextsData } from "@/types";

export default async function flighthubFetch(params: any) {
    const url = 'http://localhost:8080/api/flighthub';
    try {
        const queryParams = new URLSearchParams(params as any).toString();
        const response = await fetch(`${url}?${queryParams}`);
        const data: any = await response.json();
        // const data: any = JSON.parse(JSON.stringify(testData));
        const flighthubData: flighthubFetchData[] = transformData(data);
        return flighthubData;
    } catch (error) {
        console.error(error);
        return;
    }
}

function transformData(data: flighthubData): flighthubFetchData[] {
    return data.texts.map((flight: flighthubTextsData) => {
        const site = data.site;
        const departureInfo = [flight.Departure.Airline, flight.Departure.Duration, flight.Departure.Time, flight.Departure.Img];
        const returnInfo = [flight.Return.Airline, flight.Return.Duration, flight.Return.Time, flight.Return.Img];
        const price = flight.Price;
        const url = data.url;
        const adultNumber = data.adultNumber;
        const classFlight = data.classFlight;
        return {
            Site: site,
            DepartureInfo: {
                Airline: departureInfo[0],
                Duration: departureInfo[1],
                CombinedTime: departureInfo[2],
                Img: departureInfo[3],
            },
            ReturnInfo: {
                Airline: returnInfo[0],
                Duration: returnInfo[1],
                CombinedTime: returnInfo[2],
                Img: returnInfo[3],
            },
            Price: price,
            Url: url,
            AdultNumber: adultNumber,
            ClassFlight: classFlight || 'Economy',
        }
    });
}

// 20240903203438
// http://localhost:8080/api/flighthub?origin=Montreal%20-%20Dorval%20(Montr%C3%A9al-Trudeau)%20-%20YUL&destination=New%20York%20-%20John%20F.%20Kennedy%20(NY)%20-%20JFK&departure=2024-10-09&return=2024-11-09&adults=1%20Adult&class=Economy&headless=true

const testData = {
    "site": "Flighthub",
    "texts": [
      {
        "Airline": {
          "1": "United Airlines",
          "2": "United Airlines"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/UAx2.png",
          "Airline": "United Airlines",
          "Duration": "1h 57m",
          "Time": "7:30pm-9:27pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/UAx2.png",
          "Airline": "United Airlines",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 272.22"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 57m",
          "Time": "7:30pm-9:27pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 301.13"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 57m",
          "Time": "7:30pm-9:27pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-7:30pm-8:53pm"
        },
        "Price": "CAD 309.04"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 57m",
          "Time": "7:30pm-9:27pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-8:00pm-9:18pm"
        },
        "Price": "CAD 309.04"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "10:10am-11:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 378.35"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "9:10am-10:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 378.35"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "7:55am-8:40am-9:20am-10:28am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 378.35"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "8:10am-9:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 378.35"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "10:10am-11:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-7:30pm-8:53pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "10:10am-11:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-8:00pm-9:18pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "9:10am-10:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-7:30pm-8:53pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "9:10am-10:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-8:00pm-9:18pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "7:55am-8:40am-9:20am-10:28am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-7:30pm-8:53pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "8:10am-9:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-7:30pm-8:53pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "7:55am-8:40am-9:20am-10:28am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-8:00pm-9:18pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 24m",
          "Time": "8:10am-9:34am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-8:00pm-9:18pm"
        },
        "Price": "CAD 386.26"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "8:40am-9:25am-10:00am-11:08am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 393.05"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "7:55am-8:40am-10:00am-11:08am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 27m",
          "Time": "10:05am-11:32am"
        },
        "Price": "CAD 393.05"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "8:40am-9:25am-10:00am-11:08am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-7:30pm-8:53pm"
        },
        "Price": "CAD 400.96"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "7:55am-8:40am-10:00am-11:08am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-7:30pm-8:53pm"
        },
        "Price": "CAD 400.96"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "8:40am-9:25am-10:00am-11:08am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-8:00pm-9:18pm"
        },
        "Price": "CAD 400.96"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "0h 45m",
          "Time": "7:55am-8:40am-10:00am-11:08am-1:15pm-3:00pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "3:55pm-5:39pm-8:00pm-9:18pm"
        },
        "Price": "CAD 400.96"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 57m",
          "Time": "7:30pm-9:27pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "9:45am-11:29am-2:00pm-3:18pm"
        },
        "Price": "CAD 426.64"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 57m",
          "Time": "7:30pm-9:27pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "9:45am-11:29am-4:00pm-5:23pm"
        },
        "Price": "CAD 426.87"
      },
      {
        "Airline": {
          "1": "Air Canada",
          "2": "Air Canada"
        },
        "Departure": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 57m",
          "Time": "7:30pm-9:27pm"
        },
        "Return": {
          "Image": "https://cf-assets.flighthub.com/images/suppliersx2/ACx2.png",
          "Airline": "Air Canada",
          "Duration": "1h 44m",
          "Time": "9:45am-11:29am-5:00pm-6:23pm"
        },
        "Price": "CAD 426.87"
      }
    ],
    "url": "https://www.flighthub.com/flight/search?num_adults=1&num_children=0&num_infants=0&num_infants_lap=0&seat_class=economy&type=roundtrip&campaign=1&seg0_from=YUL&seg0_to=JFK&seg0_date=2024-10-09&seg1_date=2024-11-09&seg1_from=JFK&seg1_to=YUL",
    "adultNumber": 1,
    "class": "economy"
  }