var express = require('express');
var router = express.Router();

var Message = require('../models/message');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find().exec((err, users) => {
    if (err) console.error(err);
    Message.find().exec((err, messages) => {
      if (err) console.error(err);
      messages.forEach((message) => {
        let messageAuthor = users.find((user) => {
          return user._id.toString() === message.author.toString();
        });
        message.firstname = messageAuthor.firstname;
        message.lastname = messageAuthor.lastname;
      });
      res.render('index', { title: 'Members Only', user: req.user, messages: messages });
    });
  });
});

module.exports = router;
