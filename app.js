if (process.env.NODE_ENV !== 'production') {
    require('@glimpse/glimpse').init();         // Full-stack Node.js web diagnostics 
}
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var avisRoutes = require('./routes/avis');
var dashboardRoutes = require('./routes/dashboard');


var app = express();
mongoose.connect('localhost:27017/node-angular');  //node-angular c'est le nom de la base de donnée

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});



app.use('/', dashboardRoutes); // eny request comes to /avis will be forwarded to user.js
app.use('/avis', avisRoutes); // eny request comes to /avis will be forwarded to user.js
app.use('/user', userRoutes); // eny request comes to /user will be forwarded to user.js
app.use('/', appRoutes);


// catch 404 and forward to error handler


app.use(function(req, res, next) {
   jwt.verify(req.cookies.token, 'secret', function(err, decoded) {    
        if (!err) {
            res.render('dashboard');
        }
        else{
           res.render('index'); 
        }
   });
});

module.exports = app;
