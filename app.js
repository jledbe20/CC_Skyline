const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');
const config = require('./config.js');
var app = express();

//sets up references for mongodb
const mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const passportRouter = require('./routes/passport_routes.js');
const User = require("./models/user");
const UserLogin = require("./models/userLogin");
const Request = require("./models/requestForm");
const Notifications = require("./models/notifications");
require('dotenv').config();

const MONGODB_URI = "mongodb+srv://skylineT:unccSkyline2022@cluster0.59ufx.mongodb.net/";

// mongoose.connect('mongodb://localhost:27017/skyliners');
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true} )
.then((result) => app.listen(config.dbPort)) // db listens for requests after connections is complete
.catch((err)=> console.log(err) );

User.find({ }, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        // console.log("Returns users collections: ", docs);
    }
});
/*
run();

async function run() {

    try{
        //demonstrates how to fill in the request and user schema
        const request = await Request.create({
            subContact:{
                subName: "mark",
                subPhone: "444-333-2231",
                subEmail:"wilkisons@gmail.com",
            },

            requestDates:{
                startDate: "10/11/2012",
                startTime: "10/22/2023",
                endDate: "10/11/2012",
                endTime: "10/11/2012",

            },

            requestName: "Halloween",

            requestDescription: "It's to help celebrate Hallow's Eve",

            requestColorHex: "purple, murasaki",

            recurringEvent: false,

            approvalRejectionComments: "I don't think this holidays is approriate for our orgnization.",
        });

        Request.find({ }, function (err, docs) {
            if (err){
                console.log(err);
            }
        });

    } catch(e){
        console.log(e.message);
    }
}*/
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

passport.use(UserLogin.createStrategy());
passport.serializeUser(UserLogin.serializeUser());
passport.deserializeUser(UserLogin.deserializeUser());

app.use(indexRouter);
app.use(passportRouter);

// manually instantiate users in DB
// UserLogin.register({username:'Jon', active: false}, 'test');
// UserLogin.register({username:'Moira', active: false}, 'test')
// UserLogin.register({username:'Paul', active: false}, 'test')
// UserLogin.register({username:'Drew', active: false}, 'test')

UserLogin.register({username:'Manech', active: false}, 'Matilda')

app.listen(config.listenPort);
console.log("Launching! Now listening on port", config.listenPort);

console.log("Database port is", config.dbPort);