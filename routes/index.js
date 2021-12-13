const Express = require('express');
const { appendFile } = require('fs');

let router = Express.Router();
const calendarRouter = require('./calendar.js');

const mongoose = require('mongoose');
const Request = require("../models/requestForm");
mongoose.connect("mongodb://localhost/SkylineTest");

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/notifications', async function (req, res) {
	res.render('notifications');
});

router.get('/directory', async function (req, res) {
	res.render('directory');
});

router.get('/login', async function (req, res) {
	res.render('login');
});

router.get('/contact', async function (req, res) {
	res.render('contact');
});

router.use('/calendar', calendarRouter);
router.use('/calendar/*', calendarRouter);

router.get('/faq', async function (req, res) {
	res.render('faq');
});

router.get('/request', async function(req, res){
	res.render('request');
});

router.post("/requestForm", async function (req, res) {

	//checkbox check for recurring
	var boxOutput = false;
	var checkoutMessage;

	let checkedValue = req.body["isRecurring"];
	if (checkedValue) {
		checkoutMessage += 'the box WAS checked';
		boxOutput = true;
	} else {
		checkoutMessage += 'the box was NOT checked';
	}
	//need to add a validator (theses might help) https://mongoosejs.com/docs/validation.html
	//https://flaviocopes.com/express-validate-input/ 
	//http://expressjs.com/en/4x/api.html#res.json
	//async information https://javascript.info/async
	//https://school.geekwall.in/p/SJ_Tkqbi4
	//https://www.tutorialspoint.com/nodejs/nodejs_response_object.htm
	//https://school.geekwall.in/p/SJ_Tkqbi4

	const requests = await Request.create({
		subContact: {
			subName: req.body.name,
			subPhone: req.body.phone,
			subEmail: req.body.email
		},
		requestDate: {
			startDate: req.body.startDate,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			endDate: req.body.endDate
		},
		requestName: req.body.eventName,
		requestDescription: req.body.description,
		requestColorHex: req.body.hex1,
		recurringEvent: boxOutput,
		approvalRejectionComments: true

	});
	console.log(requests);
	res.redirect("/views/index.ejs");
	res.status(201).end();

});

router.get('/*', async function(req, res){
	res.render('index');
});

router.post("/requestForm", async function (req, res) {

	//checkbox check for recurring
	var boxOutput = false;
	var checkoutMessage;

	let checkedValue = req.body["isRecurring"];
	if (checkedValue) {
		checkoutMessage += 'the box WAS checked';
		boxOutput = true;
	} else {
		checkoutMessage += 'the box was NOT checked';
	}
	//need to add a validator (theses might help) https://mongoosejs.com/docs/validation.html
	//https://flaviocopes.com/express-validate-input/ 
	//http://expressjs.com/en/4x/api.html#res.json
	//async information https://javascript.info/async
	//https://school.geekwall.in/p/SJ_Tkqbi4
	//https://www.tutorialspoint.com/nodejs/nodejs_response_object.htm
	//https://school.geekwall.in/p/SJ_Tkqbi4

	const requests = await Request.create({
		subContact: {
			subName: req.body.name,
			subPhone: req.body.phone,
			subEmail: req.body.email
		},
		requestDate: {
			startDate: req.body.startDate,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			endDate: req.body.endDate
		},
		requestName: req.body.eventName,
		requestDescription: req.body.description,
		requestColorHex: req.body.hex1,
		recurringEvent: boxOutput,
		approvalRejectionComments: true

	});
	console.log(requests);
	res.redirect("/views/index.ejs");
	res.status(201).end();

});


module.exports = router;