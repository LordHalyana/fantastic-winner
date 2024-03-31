const express = require('express');
const app = express();
const port = 3000;
const posts = require('./routes/posts'); // import the posts router
const path = require('path');


// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));


//middleware
app.use(express.json()); // for parsing application/json



//import all routes
app.use('/posts', posts);




app.get('/', (req, res) => {
    res.render('pages/index');
  });


app.get('/test', (req, res) => {
  res.send('How you find this?');
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});