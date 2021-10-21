const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');
const config = require('./config.js');

var app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/', indexRouter);

app.listen(config.listenPort);