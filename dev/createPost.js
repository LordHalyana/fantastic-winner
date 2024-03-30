const http = require('http');
const querystring = require('querystring');

function createPost(title, description) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      title: title,
      description: description
    });

    const options = {
      hostname: '172.234.115.144',
      port: 3000,
      path: '/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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

module.exports = createPost;