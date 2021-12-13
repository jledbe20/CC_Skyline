const Express = require('express');
const { appendFile } = require('fs');

const calendarRouter = require('./calendar.js');

const mongoose = require('mongoose');
const Request = require("../models/requestForm");
//mongoose.connect("mongodb://localhost/SkylineTest");

// Routes for passport (login middleware)
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

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

router.get('/request', async function (req, res) {
	res.render('request');
});

router.get('/login', (req, res) => {
	res.render('login', { title: 'Login' });
});

router.get('/private', (req, res) => {
	res.render('private', { title: 'Logged In' });
});

router.get('/private', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
	res.render('private', { title: 'Logged In' })
);

router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
	res.render('secret', { title: 'Secret Page' })
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/*', async function (req, res) {
	res.render('index');
});

// POST Routes
router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/private',
	}),
	(req, res) => {
		console.log(req.user);
	}
);

router.post("/request", async function (req, res) {

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
	let request;
	try {
		request = await Request.create({
			subContact: {
				subName: req.body.name,
				subPhone: req.body.phone,
				subEmail: req.body.email
			},
			requestDates: {
				startDate: req.body.startDate,
				// Can I apologize to God for this one?
				startTime: new Date('1970-01-01T' + req.body.startTime),
				endTime: new Date('1970-01-01T' + req.body.endTime),
				endDate: req.body.endDate
			},
			requestName: req.body.eventName,
			requestDescription: req.body.description,
			requestColorHex: req.body.hex1,
			recurringEvent: boxOutput,
			approvalRejectionComments: true

		});
	} catch (e) {
		console.log(e);
		return res.redirect("/request");
	}
	res.render("requestConfirmation.ejs");
	res.status(201).end();

});

module.exports = router;