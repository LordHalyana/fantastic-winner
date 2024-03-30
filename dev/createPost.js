const http = require('http');
const querystring = require('querystring');

function createPost(title, description, callback) {
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
      callback(null, data);
    });
  });

  req.on('error', error => {
    callback(error);
  });

  req.write(postData);
  req.end();
}

createPost('WoW I created a Post!', 'This post is created from the dev script createPost!', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});