const express = require('express');
const router = express.Router();
const { signUp, login , logout} = require('../controller/usercontroller');

router.get('/signup', (req, res) => {
  res.render('signup', { flash: req.flash('error') });
});

router.post('/signup', signUp);

router.get('/login', (req, res) => {
  res.render('login', { flash: req.flash('error') });
});

router.post('/login',login);

router.get('/home', (req, res) => {
  // Render the home/dashboard page
  res.render('home');
});

router.get('/logout',logout);
module.exports = router;

