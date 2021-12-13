// Routes for passport (login middleware)

const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

// GET Routes
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/private', (req, res) => {
  res.render('private', { title: 'Logged In' });
});

// router.get('/private', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
//   res.render('private', { title: 'Logged In' })
// );

router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('secret', { title: 'Secret Page' })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// POST Routes
router.post(
  '/login',
  passport.authenticate('local', {
    // failureRedirect: '/login',
    // temporary until login is fixed:
    failureRedirect: '/login',
    successRedirect: '/secret',
  }),
  (req, res) => {
    // console.log(req.user);
  }
);

module.exports = router;