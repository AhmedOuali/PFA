var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/',function(req, res, next) {
    var user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : bcrypt.hashSync(req.body.password, 10),
        email : req.body.email
    });
    user.save(function(err, result){
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                obj: user,
                error: err.message,
                message: err.message
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result,
            title: 'success'
        });
    });
});

router.post('/signin',function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                obj: user,
                error: err.message
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                message: 'Invalid Login'
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                message: 'Invalid Login'
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            title: 'Success',
            message: 'successfully logged in',
            token: token,
            userId: user._id
        });
        
    });
});
module.exports = router;