const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const path = require("path");
const users = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json"), "utf8")
);

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(
  new LocalStrategy(function (username, password, done) {
    // Look up the user by username from the users array
    const user = users.find((user) => user.username === username);
    // If the user is not found, return a message indicating so
    if (user === undefined) {
      return done(null, false, { message: "User not found" });
    }
    // If the password does not match, return a message indicating so
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password" });
    }
    // If the user is found and the password matches, return the user object
    return done(null, user);
  })
);

// In order to support login sessions, Passport will serialize and
// deserialize user instances to and from the session.
passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  const user = users.find((user) => user.username === username);
  if (user !== undefined) {
    done(null, user);
  } else {
    done(new Error("User not found"));
  }
});

// Define a POST route for the root path to handle login attempts
router.post("/", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", { error: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // If login is successful, redirect to the memes page
      req.session.user = user;
      return res.redirect("/");
    });
  })(req, res, next);
});

// Define a GET route for the root path to render the login page
router.get("/", function (req, res, next) {
  if (!req.user) {
    res.render("pages/login", { user: null });
  } else {
    res.render("pages/login", { user: req.user });
  }
});

// Define a POST route for the logout path to handle logout requests
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // If logout is successful, redirect to the root page
    res.redirect("/");
  });
});

// Export the router to be used in other parts of the application
module.exports = router;