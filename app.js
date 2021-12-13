const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');
const config = require('./config.js');
const mongoose = require('mongoose');
const User = require("./models/user");
const Request = require("./models/requestForm");
const Notifications = require("./models/notifications");

mongoose.connect("mongodb://localhost/SkylineTest");

var app = express();

User.find({}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Returns users collections: ", docs);
    }
});

Request.find({}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Returns Request collections: ", docs);
    }
});


app.set('view engine', 'ejs');
// The weird path shenanigans are to make it work on any system
// Without this, you may get weird bugs on non-windows OSes
app.set('views', `${__dirname}/views`);
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/', indexRouter);

app.listen(config.listenPort);
console.log("Launching! Now listening on port", config.listenPort);

console.log("Database port is", config.dbPort);

