var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');

var Message = require('../models/message');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('create_message', { title: 'Create Message', user: req.user });
});

router.post('/create', [
  body('title').isString(),
  body('message').isString()
], function(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.redirect('/messsages/create');
  }
  else {
    var newMessage = new Message({
      title: req.body.title,
      text: req.body.message,
      author: req.user._id,
    });
    newMessage.save((err) => {
      if (err) console.error(err);
      res.redirect('/')
    });
  }
});

router.get('/:id/delete', function(req, res, next) {
  Message.findByIdAndDelete(req.params.id)
    .exec((err) => {
      if (err) console.error(err);
      res.redirect('/');
    });
});

module.exports = router;
