var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// /* GET home page. */
router.get('/logout', function(req, res, next) {
    res.clearCookie('token')
    .clearCookie('userId')
    .clearCookie('firstName')
    .clearCookie('lastName')
    .clearCookie('usr_photo_url')
    .clearCookie('user_id')
    .redirect('/auth/signin');
});



//-----------------------------------------------
//-----------------------------------------------

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
