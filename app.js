const port = 3000;

// libraries
var express = require("express");
var path = require("path");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//import routes
var index = require("./routes/index"); // import the index router
var loginRouter = require("./routes/login"); // import the login router
var posts = require("./routes/posts"); // import the posts router
var users = require("./routes/users"); // import the users router
var about = require("./routes/about"); // import the about router
var contact = require("./routes/contact"); // import the contact router

// Initialize Express app
var app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up middleware for logging, parsing, and static files
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "node_modules")));

// 'public' should be the directory where your static files are located
app.use(express.static("public"));

// Set up session and Passport middleware
app.use(
  session({
    secret: "CentralMemes",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

//middleware to check if user is authenticated
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//import all routes
app.use("/", index);
app.use("/login", loginRouter);
app.use("/posts", posts);
app.use("/users", users);
app.use("/about", about);
app.use("/contact", contact);

app.get("/test", (req, res) => {
  res.send("How you find this?");
});



// Set up error handlers
app.use(function (req, res, next) {
  next(createError(404));
});




// Start the server

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
