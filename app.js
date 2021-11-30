const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');
const config = require('./config.js');
const mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./userDetails');
const passportRouter = require('./routes/router.js');
require('dotenv').config();

const MONGODB_URI = "mongodb+srv://skylineT:unccSkyline2022@cluster0.59ufx.mongodb.net/";

// mongoose.connect('mongodb://localhost:27017/skyliners');
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true} )
.then((result) => app.listen(config.dbPort)) // db listens for requests after connections is complete
.catch((err)=> console.log(err) );


app.set('view engine', 'ejs');
// The weird path shenanigans are to make it work on any system
// Without this, you may get weird bugs on non-windows OSes
app.set('views', `${__dirname}/views`);
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/', indexRouter);

// set up view engine and layout
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

// Set up session
app.use(
    session({
      secret: process.env.SECRET || 'the skyline is lit and all is well',
      resave: false,
      saveUninitialized: true,
    })
);

app.use(express.urlencoded({ extended: false }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(passportRouter);

// manually instantiate user in DB
// UserDetails.register({username:'Jon', active: false}, 'test');
// require('./path/to/passport/config/file')(passport);

app.listen(config.listenPort);
console.log("Launching! Now listening on port", config.listenPort);
console.log("Database port is", config.dbPort);
