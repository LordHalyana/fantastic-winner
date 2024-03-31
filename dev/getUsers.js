const http = require('http');

function getPosts() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '172.234.115.144',
      port: 3000,
      path: '/users',
      method: 'GET'
    };

    const req = http.request(options, res => {
      let data = '';
      res.on('data', d => {
        data += d;
      });
      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.end();
  });
}

module.exports = getPosts;