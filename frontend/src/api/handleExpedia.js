const test_data_expediaData = {
    site: 'Expedia',
    text: {
      info: [
        'Select and show fare information for Royal Air Maroc flight, departing at 8:35 PM from Montreal, arriving at 3:05 AM in Douala, Priced at CA $2,098 Roundtrip per traveller. Arrives 2 days later. 24 hours 30 minutes total travel time, One stop, Layover for 12 hours 45 minutes in Casablanca.',
        'Select and show fare information for Air Canada flight, departing at 6:55 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,958 Roundtrip per traveller, 1 left at this price. Arrives 1 day later. 17 hours 45 minutes total travel time, One stop, Layover for 3 hours 45 minutes in Brussels.• Air Canada 6318 operated by Brussels Airlines',
        'Select and show fare information for Brussels Airlines flight, departing at 6:55 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,958 Roundtrip per traveller, 1 left at this price. Arrives 1 day later. 17 hours 45 minutes total travel time, One stop, Layover for 3 hours 45 minutes in Brussels.• Brussels Airlines 9552 operated by Air Canada',
        "We've found you a great deal!. Get more, spend less with up to CA $1,096 off when you book your flight + stay together.Opens in a new tab",
        'Select and show fare information for Delta flight, departing at 11:05 PM from Montreal, arriving at 9:20 PM in Douala, Priced at CA $3,642 Roundtrip per traveller. Arrives 1 day later. 16 hours 15 minutes total travel time, One stop, Layover for 2 hours 45 minutes in Paris.• Delta 8613 and 8196 operated by Air France',
        'Select and show fare information for Air Canada flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,784 Roundtrip per traveller, 2 left at this price. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 1 hour 15 minutes in Zürich • Layover for 2 hours 50 minutes in Brussels.• Air Canada 6820 operated by Swiss International Air Lines, Air Canada 6794 operated by Air Baltic Corporation/Swiss, Air Canada 6318 operated by Brussels Airlines',
        'Select and show fare information for Rwandair flight, departing at 8:50 PM from Montreal, arriving at 10:50 AM in Douala, Priced at CA $2,518 Roundtrip per traveller. Arrives 2 days later. 32 hours 0 minutes total travel time, Two stops, Layover for 8 hours 45 minutes in Doha • Layover for 1 hour 25 minutes in Kigali.• Rwandair 1119 operated by Qatar Airways',
        'Select and show fare information for multipleAirlines flight, departing at 9:15 AM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,601 Roundtrip per traveller. Arrives 1 day later. 27 hours 25 minutes total travel time, Two stops, Layover for 6 hours 27 minutes in Washington • Layover for 4 hours 25 minutes in Brussels.• United 3590 operated by Republic Airways DBA United Express',
        'Select and show fare information for Swiss International Air Lines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,784 Roundtrip per traveller. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 2 hours 30 minutes in Zürich • Layover for 1 hour 40 minutes in Brussels.• Swiss International Air Lines 4546 and 4540 operated by Brussels Airlines',
        'Select and show fare information for Swiss International Air Lines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,784 Roundtrip per traveller, 2 left at this price. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 1 hour 15 minutes in Zürich • Layover for 2 hours 50 minutes in Brussels.• Swiss International Air Lines 786 operated by Air Baltic, Swiss International Air Lines 4540 operated by Brussels Airlines',
        'Select and show fare information for multipleAirlines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,784 Roundtrip per traveller. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 2 hours 30 minutes in Zürich • Layover for 1 hour 40 minutes in Brussels.• Air Canada 6820 operated by Swiss International Air Lines, Swiss International Air Lines 4546 and 4540 operated by Brussels Airlines',
        'Select and show fare information for multipleAirlines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,865 Roundtrip per traveller, 2 left at this price. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 1 hour 15 minutes in Zürich • Layover for 2 hours 50 minutes in Brussels.• Air Canada 6820 operated by Swiss International Air Lines, Swiss International Air Lines 786 operated by Air Baltic',
        'Select and show fare information for multipleAirlines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,865 Roundtrip per traveller. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 2 hours 30 minutes in Zürich • Layover for 1 hour 40 minutes in Brussels.• Air Canada 6820 operated by Swiss International Air Lines, Swiss International Air Lines 4546 operated by Brussels Airlines',
        'Select and show fare information for Air France flight, departing at 11:05 PM from Montreal, arriving at 9:20 PM in Douala, Priced at CA $3,677 Roundtrip per traveller. Arrives 1 day later. 16 hours 15 minutes total travel time, One stop, Layover for 2 hours 45 minutes in Paris.',
        'Select and show fare information for multipleAirlines flight, departing at 6:00 AM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,601 Roundtrip per traveller. Arrives 1 day later. 30 hours 40 minutes total travel time, Two stops, Layover for 9 hours 59 minutes in Chicago • Layover for 2 hours 45 minutes in Brussels.• United 3680 operated by Republic Airways DBA United Express',
        'Select and show fare information for multipleAirlines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,865 Roundtrip per traveller. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 2 hours 30 minutes in Zürich • Layover for 1 hour 40 minutes in Brussels.• Air Canada 6820 operated by Swiss International Air Lines',
        'Select and show fare information for multipleAirlines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,865 Roundtrip per traveller, 2 left at this price. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 1 hour 15 minutes in Zürich • Layover for 2 hours 50 minutes in Brussels.• Air Canada 6820 operated by Swiss International Air Lines, Brussels Airlines 5104 operated by Swiss International Air Lines',
        'Select and show fare information for multipleAirlines flight, departing at 4:50 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,865 Roundtrip per traveller, 2 left at this price. Arrives 1 day later. 19 hours 50 minutes total travel time, Two stops, Layover for 1 hour 15 minutes in Zürich • Layover for 2 hours 50 minutes in Brussels.• Air Canada 6820 operated by Swiss International Air Lines, Swiss International Air Lines 786 operated by Air Baltic, Swiss International Air Lines 4540 operated by Brussels Airlines',
        'Select and show fare information for Delta flight, departing at 7:05 PM from Montreal, arriving at 9:20 PM in Douala, Priced at CA $2,874 Roundtrip per traveller. Arrives 1 day later. 20 hours 15 minutes total travel time, Two stops, Layover for 2 hours 25 minutes in Amsterdam • Layover for 2 hours 50 minutes in Paris.• Delta 9396 operated by KLM, Delta 8405 and 8196 operated by Air France',
        'Select and show fare information for Delta flight, departing at 7:05 PM from Montreal, arriving at 9:20 PM in Douala, Priced at CA $2,874 Roundtrip per traveller. Arrives 1 day later. 20 hours 15 minutes total travel time, Two stops, Layover for 1 hour 30 minutes in Amsterdam • Layover for 3 hours 45 minutes in Paris.• Delta 9396 operated by KLM, Delta 8479 and 8196 operated by Air France',
        'Select and show fare information for multipleAirlines flight, departing at 1:10 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,701 Roundtrip per traveller. Arrives 1 day later. 23 hours 30 minutes total travel time, Two stops, Layover for 3 hours 10 minutes in Chicago • Layover for 2 hours 45 minutes in Brussels.• Air Canada 8961 operated by Air Canada Express - Jazz',
        'Select and show fare information for multipleAirlines flight, departing at 9:15 AM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,701 Roundtrip per traveller. Arrives 1 day later. 27 hours 25 minutes total travel time, Two stops, Layover for 7 hours 1 minute in Chicago • Layover for 2 hours 45 minutes in Brussels.• Air Canada 8959 operated by Air Canada Express - Jazz',
        'Select and show fare information for multipleAirlines flight, departing at 6:55 PM from Montreal, arriving at 9:20 PM in Douala, Priced at CA $3,046 Roundtrip per traveller. Arrives 1 day later. 20 hours 25 minutes total travel time, Two stops, Layover for 1 hour 0 minutes in Atlanta • Layover for 1 hour 30 minutes in Paris.• WestJet 6325 operated by Delta, Delta 8196 operated by Air France',
        'Select and show fare information for Air France flight, departing at 7:05 PM from Montreal, arriving at 9:20 PM in Douala, Priced at CA $3,677 Roundtrip per traveller. Arrives 1 day later. 20 hours 15 minutes total travel time, One stop, Layover for 6 hours 40 minutes in Paris.',
        'Select and show fare information for multipleAirlines flight, departing at 6:20 PM from Montreal, arriving at 6:40 PM in Douala, Priced at CA $2,761 Roundtrip per traveller. Arrives 2 days later. 42 hours 20 minutes total travel time, Two stops, Layover for 22 hours 0 minutes in Chicago • Layover for 2 hours 45 minutes in Brussels.• Air Canada 8967 operated by Air Canada Express - Jazz',
        'Select and show fare information for multipleAirlines flight, departing at 7:00 AM from Montreal, arriving at 11:35 AM in Douala, Priced at CA $3,157 Roundtrip per traveller. Arrives 1 day later. 22 hours 35 minutes total travel time, Two stops, Layover for 1 hour 45 minutes in Toronto • Layover for 1 hour 30 minutes in Addis Ababa.'
      ]
    },
    url: 'https://www.expedia.ca/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:YUL,to:DLA,departure:18/12/2024TANYT,fromType:U,toType:U&leg2=from:DLA,to:YUL,departure:10/01/2025TANYT,fromType:U,toType:U&options=cabinclass:economy&fromDate=18/12/2024&toDate=10/01/2025&d1=2024-12-18&d2=2025-01-10&passengers=adults:1,infantinlap:N',
    adultNumber: 1,
    class: 'Economy'
  }

export const transformExpediaData = (info) => {
    const flights = [];

      function convertToMinutes(hours, minutes) {
        return (parseInt(hours) * 60) + parseInt(minutes);
      }

      function extractTotalMinutes(text) {
        const match = durationRegex .exec(text);
        if (match) {
          const [_, hours, minutes] = match;
          return convertToMinutes(hours, minutes);
        }
        return null; 
      }

    const flightRegex = /departing at (\d{1,2}:\d{2} (AM|PM)) from (.+?), arriving at (\d{1,2}:\d{2} (AM|PM)) in (.+?), Priced at CA \$([\d,]+) Roundtrip per traveller(?:, \d+ left at this price)?(?:.*?Total travel time, (\d{1,2} hours \d{2} minutes))?/i;
    const durationRegex = /(\d{1,2})\s*hours\s*(\d{1,2})\s*minutes\s*total\s*travel\s*time/g;    


    info.forEach(flight => {
      let match = flightRegex.exec(flight);
          let totalMinutes = extractTotalMinutes(flight);
          if (totalMinutes == null) {
            totalMinutes = 'N/A';
          }
      if (match) {
        const [fullMatch, departureTime, _, departureCity, arrivalTime, __, arrivalCity, price, totalTravelTime] = match;
        
        flights.push({
          site: 'Expedia', 
          departureTime: departureTime,
          arrivalTime: arrivalTime,
          departureCity: departureCity,
          arrivalCity: arrivalCity,
          price: parseInt(price.replace(/,/g, ''), 10),
          totalDuration: totalMinutes,
        });
      }
});
  
  return flights;
};
  
  // const flightDetails = transformExpediaData(test_data_expediaData.text.info);
  // console.log(flightDetails);

// const text = test_data_expediaData.text.info;

  


// function convertToMinutes(hours, minutes) {
//   return (parseInt(hours) * 60) + parseInt(minutes);
// }

// function extractTotalMinutes(text) {
//   const match = durationRegex .exec(text);
//   if (match) {
//     const [_, hours, minutes] = match;
//     return convertToMinutes(hours, minutes);
//   }
//   return null; 
// }

// text.forEach(entry => {
//   const totalMinutes = extractTotalMinutes(entry);
//   if (totalMinutes !== null) {
//     console.log(`Total Duration in Minutes: ${totalMinutes}`);
//   }
// });