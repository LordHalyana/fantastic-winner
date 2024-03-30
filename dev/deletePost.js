const http = require("http");

function deletePost(title) {
  const postData = JSON.stringify({
    title: title,
  });

  const options = {
    hostname: "172.234.115.144",
    port: 3000,
    path: "/posts",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  const req = http.request(options, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(postData);
  req.end();
}

// Call the functionconst http = require('http');

function deletePost(title) {
  const postData = JSON.stringify({
    title: title,
  });

  const options = {
    hostname: "172.234.115.144",
    port: 3000,
    path: "/posts",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  const req = http.request(options, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(postData);
  req.end();
}

module.exports = deletePost;
