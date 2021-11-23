//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const main = require('./routes/main');
const { ppid } = require('process');

//create app 
const app = express();

//configure appm
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/project'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use('/public', express.static('public'));

//Import route files for coursedetails and index
var routes = require('./routes/main');

app.use('/', routes);

app.use((req, res, next)=> {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal server error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});
