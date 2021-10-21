const Express = require('express');

let router = Express.Router();

router.get('/*', async function(req, res){
	res.render('index');
});

module.exports = router