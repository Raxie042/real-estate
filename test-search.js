const http = require('http');

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/search/radius',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('BODY:', data);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

const body = JSON.stringify({
  latitude: 40.7589,
  longitude: -73.9851,
  radiusKm: 50,
  limit: 5,
  sortBy: 'distance'
});

req.write(body);
req.end();
