const Express = require('express');
const { appendFile } = require('fs');

let router = Express.Router();
const calendarRouter = require('./calendar.js');

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

router.get('/*', async function(req, res){
	res.render('index');
});

module.exports = router;