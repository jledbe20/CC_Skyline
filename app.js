const express = require('express');

const path = require('path');
const indexRouter = require('./routes/index.js');
const config = require('./config.js');

// mongoose / passport stuff:
const mongoose = require("mongoose"),
passport = require("passport"),
bodyParser = require("body-parser"),
LocalStrategy = require("passport-local"),
passportLocalMongoose =
    require("passport-local-mongoose");

// connect to DB
mongoose.connect("mongodb://localhost/skyliners");

const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(require("express-session")({
    secret: "skyscrapers get real pretty",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

// User = require("./models/user");
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// The weird path shenanigans are to make it work on any system
// Without this, you may get weird bugs on non-windows OSes
app.set('views', `${__dirname}/views`);
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/', indexRouter);

//=====================
// Passport Routes
//=====================
 
// home
app.get("/", function (req, res) {
    res.render("home");
});
 
// secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});
 
// register form
app.get("/register", function (req, res) {
    res.render("register");
});
 
// user signup
app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
 
        passport.authenticate("local")(
            req, res, function () {
            res.render("secret");
        });
    });
});
 
// login form
app.get("/login", function (req, res) {
    res.render("login");
});
 
// user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {
});
 
// user logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
 
// authenticate
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

// start server
const PORT = config.listenPort
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}...`);
  });