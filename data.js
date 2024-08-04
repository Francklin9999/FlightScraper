//This data is to test the frontend with a look a like data format

const data = {
    "expedia": {
      "site": "Expedia",
      "price": "$890",
      "url": "https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:Montreal,to:Toronto,departure:18/12/2024TANYT,fromType:U,toType:U&leg2=from:Toronto,to:Montreal,departure:10/01/2025TANYT,fromType:U,toType:U&options=cabinclass:economy&fromDate=18/12/2024&toDate=10/01/2025&d1=2024-12-18&d2=2025-01-10&passengers=adults:1,infantinlap:N",
      "adultNumber": 1,
      "class": null
    },
    "flighthub": {
      "site": "Flighthub",
      "price": "$678",
      "url": "https://www.flighthub.com/flight/search?num_adults=1&num_children=0&num_infants=0&num_infants_lap=0&seat_class=Economy&type=roundtrip&campaign=1&seg0_from=YUL&seg0_to=JFK&seg0_date=2024-12-18&seg1_date=2025-01-10&seg1_from=JFK&seg1_to=YUL",
      "adultNumber": 1,
      "class": null
    },
    "skyscanner": {
      "site": "SkyScanner",
      "price": "$491",
      "url": "https://www.skyscanner.ca/transport/vols/YUL/JFK/20241218/20250110/?adultsv2=1&cabinclass=Economy&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false",
      "adultNumber": 1,
      "class": null
    },
    "cheapflights": {
      "site": "Expedia",
      "price": "$556",
      "url": "https://www.cheapflights.ca/flight-search/YUL-JFK/2024-12-18/2025-01-10undefined?sort=price_a",
      "class": "economy"
    }
  }

export default data;