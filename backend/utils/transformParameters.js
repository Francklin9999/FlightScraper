function formatDate(date) {
    const [year, month, day] = date.split('-');
    return [day, month, year];
}

function formatAirportCode(airport) {
    const temp = airport.split(' - ');
    return temp[temp.length - 1];
}

function transformParameters(params) {
    const adults = parseInt(params.adults.split(' ')[0], 10);
    const headless = true;

    return {
        origin: formatAirportCode(params.origin),
        destination: formatAirportCode(params.destination),
        departure: formatDate(params.departure),
        return: formatDate(params.return),
        adults: adults,
        class: params.class.toLowerCase(),
        headless: headless
    };
}

module.exports = { transformParameters };
