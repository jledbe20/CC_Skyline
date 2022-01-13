const Express = require('express');
const { appendFile } = require('fs');
const fs = require("fs");
const multer = require("multer");


const calendarRouter = require('./calendar.js');
const notificationsRouter = require('./notifications.js');

const passportRouter = require('./passport_routes.js');
const mongoose = require('mongoose');
const Request = require("../models/requestForm");
const path = require('path');

const express = require('express');
const router = express.Router();
// const connectEnsureLogin = require('connect-ensure-login');
// const passport = require('passport');

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

//sets up multer for storing uploaded, will try to process the images in the 'uploads' folder.
var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Allow only png, jpg, jpeg, or gifs"));
        }
    }
});

// Gets for the public side
router.get('/', (req, res) => {
	res.render('./public/index', { title: 'Home' });
});

router.get('/login', async function (req, res) {
	res.render('./public/login');
});

router.get('/contact', async function (req, res) {
	res.render('./public/contact');
});

router.use('/calendar', calendarRouter);
router.use('/calendar/*', calendarRouter);

router.get('/faq', async function (req, res) {
	res.render('./public/faq');
});

router.get('/request', async function (req, res) {
	res.render('./public/request');
});

router.use('/login', passportRouter);
router.use('/login/*', passportRouter);
router.use('/secret', passportRouter);
router.use('/secret/*', passportRouter);
router.use('/private', passportRouter);
router.use('/private/*', passportRouter);

router.get('/calendar', (req, res) => {
	res.render('private', { title: 'Logged In' });
});

// router.get('/private', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
// 	res.render('private', { title: 'Logged In' })
// );

// router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
// 	res.render('secret', { title: 'Secret Page' })
router.use('/notifications', notificationsRouter);

router.get('/directory', async function (req, res) {
	res.render('stakeholder/directory');
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/*', async function (req, res) {
	res.render('public/index');
});

// passport POST routes
// router.post(
// 	'/login',
// 	passport.authenticate('local', {
// 		failureRedirect: '/login',
// 		successRedirect: '/secret',
// 	}),
// 	(req, res) => {
// 		console.log(req.user);
// 	}
// );


router.post("/request", upload.single('image'), async function (req, res, next) {
    //checkbox check for recurring
    var boxOutput = false;

    let checkedValue = req.body["isRecurring"];
    if (checkedValue) {
        boxOutput = true;
    }

    // If there is only one color hex
    if (typeof req.body.hex === 'string') {
        // Overwrite it with an array of itself, to match the many case.
        req.body.hex = [req.body.hex];
    }
    try {
        var dataPath = fs.readFileSync(path.join('./uploads/' + req.file.filename));
        console.log("images is uploaded");
        let reqObj = {
            requestImage: {
                fileImgName: req.file.originalname,
                img: {
                    data: dataPath,
                    contentType: req.file.mimetype
                }
            },
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
            requestColorHex: JSON.stringify(req.body.hex),
            recurringEvent: boxOutput,
            approvalRejectionComments: false
        }
        Request.create(reqObj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('saved with images');
                item.save();
                //might be an issue
                res.redirect('public/requestConfirmation');
                res.status(201).end();
            }
        });
    }
    catch (e) {
        console.log(dataPath);
        reqObj = {
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
            requestColorHex: JSON.stringify(req.body.hex),
            recurringEvent: boxOutput,
            approvalRejectionComments: false
        }
        Request.create(reqObj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('saved without images');
                item.save();
                res.redirect('public/requestConfirmation');
                res.status(201).end();
            }
        });
    }
});

module.exports = router;