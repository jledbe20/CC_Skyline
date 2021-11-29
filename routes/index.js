const Express = require('express');

let router = Express.Router();

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

router.get('/calendar', async function (req, res) {
	res.render('calendar');
});

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