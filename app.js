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
    console.log(request);

    const user = await User.create({ 
        name:{
        firstName:"pomu RPR", 
        lastName:"pmus"
        },
        email:"pomu@gmail.com",
        phone:"706-444-2241", 
        password:"great gatsby",
        company: "Bank of America",
        department: "Banking",
    
        propertyInformation:{
            pName: "Bank building of parksStreet",
            pStreet: "234 walks street.",
            pPhone: "332-333-2222",
            pUnit: "33",
            pCity: "New York City",
            pState: "North Carolina",
            pZipC: "22332",
            pLightCap: "This building is still under construction. "
        
        }
        });
        console.log(user); 
}
catch(e){
    console.log(e.message);
};
};

app.set('view engine', 'ejs');
// The weird path shenanigans are to make it work on any system
// Without this, you may get weird bugs on non-windows OSes
app.set('views', `${__dirname}/views`);
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/', indexRouter);

app.listen(config.listenPort);
console.log("Launching! Now listening on port", config.listenPort);

console.log("Database port is", config.dbPort);

