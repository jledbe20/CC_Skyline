const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');
const config = require('./config.js');
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://skylineT:unccSkyline2022@cluster0.59ufx.mongodb.net/test';

//mongoose.connect('mongodb://localhost:27017/skyliners');
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true} )
.then((result) => app.listen(3000)) //db listens for requests after connections is complete
.catch((err)=> console.log(err) );




var app = express();

app.set('view engine', 'ejs');
// The weird path shenanigans are to make it work on any system
// Without this, you may get weird bugs on non-windows OSes
app.set('views', `${__dirname}/views`);
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/', indexRouter);

app.listen(config.listenPort);
console.log("Launching! Now listening on port", config.listenPort);