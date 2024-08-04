//File to test the server

const http = require('http');
const querystring = require('querystring');

const test_data = {
    "origin" : "YUL",
    "destination" : "JFK",
    "departure" : ["18", "12", "2024"],
    "return" : ["10", "01", "2025"],
    "adults" : 1,
    "class" : "economy",
    "headless" : true,
};

const queryString = querystring.stringify(test_data);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/api`,
    method: 'GET',
};

http.get(options, (res) => {
  res.on('data', (chunk) => {
    console.log(`Received chunk: ${chunk}`);
  });

  res.on('end', () => {
    console.log('No more data.');
  });
});
