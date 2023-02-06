const express = require("express");
const session = require("express-session");
var JsonStore = require('express-session-json')(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./users.json")));

// Express session configuration
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new JsonStore()
  }));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport LocalStrategy configuration
passport.use(new LocalStrategy(
  { usernameField: "name" },
  (username, password, done) => {
    const user = users.find(user => user.name === username);
    if (!user || user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  }
));

// Serialize user data to store in session
passport.serializeUser((user, done) => {
  done(null, user.name);
});

// Deserialize user data from session
passport.deserializeUser((username, done) => {
  const user = users.find(user => user.name === username);
  done(null, user);
});

// Login page route
app.get("/login", (req, res) => {
  res.render("login");
});

// Login authentication route
app.post("/login", passport.authenticate("local", {
  successRedirect: "/memes",
  failureRedirect: "/login"
}));

// Memes Overview page route
app.get("/memes", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("memes-overview", { authenticated: true });
  } else {
    res.render("memes-overview", { authenticated: false });
  }
});

// Meme Details page route
app.get("/memes/:id", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("meme-details");
  } else {
    res.redirect("/login");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
