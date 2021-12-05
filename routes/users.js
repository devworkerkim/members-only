var express = require('express');
var router = express.Router();
var passport = require('passport');
var { body, validationResult } = require('express-validator');
var bcrypt = require('bcrypt');

var User = require('../models/user');

/* GET user login */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', user: req.user });
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })
);

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/create', function(req, res, next) {
  res.render('create_user', { title: 'Create User', user: req.user });
});

router.post('/create', [
  body('email').isEmail().trim().normalizeEmail(),
  body('password').isString().isLength({min: 8, max: undefined}),
  body('firstname').isString().trim(),
  body('lastname').isString().trim()
], function(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.redirect('/users/create');
  }
  else {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) console.error(err);
      var newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
      });
      newUser.save(function(err) {
        if (err) console.error(err);
        res.redirect('/');
      });
    });
  }
});

router.get('/join', function(req, res, next) {
  res.render('join', { title: 'Join', user: req.user });
});

router.post('/join', function(req, res, next) {
  if (req.body.password === process.env.JOIN_PASSCODE) {
    User.findByIdAndUpdate(req.user._id, {status: 'active'})
      .exec((err) => {
        if (err) console.error(err);
      })
    }
  res.redirect('/');
})

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Make Admin', user: req.user });
})

router.post('/admin', function(req, res, next) {
  if (req.body.password === process.env.ADMIN_PASSCODE) {
    User.findByIdAndUpdate(req.user._id, {admin: 'true'})
      .exec((err) => {
        if (err) console.error(err);
      });
  }
  res.redirect('/');
})

module.exports = router;
