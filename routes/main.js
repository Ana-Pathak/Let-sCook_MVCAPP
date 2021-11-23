const express = require('express');
const controller = require('../controller/mainController');
const connectionRouter = require('./connection');
const userRoutes = require('./userRoutes');
const router = express.Router();
var connection_database = require('../model/connection');

router.use('/connections',connectionRouter);

router.use('/users', userRoutes);

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/index', function (req, res) {
    res.render('index');
});

router.get('/home', function (req, res) {
    res.render('index');
});

router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});


// error handler
router.use(function(err, req, res, next) {
  console.log('error handling');
  res.status(err.status || 500);
  res.render('error',{error:err,message:err.message,url:req.url});
});
module.exports = router;