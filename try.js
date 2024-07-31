const text = "Select and show fare information for Air Transat flight, departing at 10:45 PM from Toronto, arriving at 10:45 AM in London, Priced at CA $700 Roundtrip per traveller. Arrives 1 day later. 7 hours 0 minutes total travel time, Nonstop.";

const priceRegex = /Priced at CA \$(\d+)/;
const match = text.match(priceRegex);

if (match) {
    const price = match[1];
    console.log(`The price is CA $${price}`);
} else {
    console.log('Price not found');
}
