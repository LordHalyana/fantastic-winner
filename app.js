// libraries
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//import routes
const index = require('./routes/index'); // import the index router
const posts = require('./routes/posts'); // import the posts router
const users = require('./routes/users'); // import the users router
const about = require('./routes/about'); // import the about router
const contact = require('./routes/contact'); // import the contact router

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from node_modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// 'public' should be the directory where your static files are located
app.use(express.static('public')); 

//middleware
app.use(express.json()); // for parsing application/json

//import all routes
app.use('/', index);
app.use('/posts', posts);
app.use('/users', users);
app.use('/about', about);
app.use('/contact', contact);


app.get('/test', (req, res) => {
  res.send('How you find this?');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});