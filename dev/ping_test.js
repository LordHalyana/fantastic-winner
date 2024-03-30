const http = require('http');

function ping_test() {
  const options = {
    hostname: '172.234.115.144',
    port: 3000,
    path: '/test',
    method: 'GET'
  };

  const req = http.request(options, res => {
    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end();
}

module.exports = ping_test;