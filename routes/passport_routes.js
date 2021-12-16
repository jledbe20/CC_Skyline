const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

// GET Routes
router.get('/', (req, res) => {
  res.render('./public/index', { title: 'Home' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('secret', { title: 'Secret Page' })
);

router.get('/private', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('private', { title: 'Logged In' })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
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

module.exports = router;