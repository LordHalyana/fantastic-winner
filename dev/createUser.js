const http = require('http');

function createUser(user) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(user);

    const options = {
      hostname: '172.234.115.144',
      port: 3000,
      path: '/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
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

    req.write(postData);
    req.end();
  });
}

module.exports = createUser;