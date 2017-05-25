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
        email : req.body.email,
        departement:req.body.departement,
        phone:req.body.phone
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
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email,
            departement:user.departement,
            phone:user.phone
        });
        
        
    });
});
  router.patch('/updateUser', function (req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No User Found!',
                error: {user: 'User not found'}
            });
        }
        user.lastName = req.body.lastName;
        user.firstName = req.body.firstName;
        user.email = req.body.email;
        user.departement = req.body.departement;
        user.phone = req.body.phone;
        user.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                user: 'Updated user',
                obj: result
            });
        });
    });
    res.redirect('/');
});
module.exports = router;