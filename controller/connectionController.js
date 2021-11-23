//const { connections, connection } = require('mongoose');
const model = require('../model/connection');
const utility = require('../model/utility');

exports.index = (req, res)=>{
    model.find()
    .then(connections=>{
        let topic = utility.topic(connections);
        console.log(topic);
        res.render('./connections', {connections, topic})
    })
    .catch(err=>
       res.send(err));
};

exports.new = (req,res)=>{
    res.render('newConnection');
};

exports.create = (req, res)=>{
    let connection = new model(req.body);
    connection.author = req.session.user;
    connection.save()
    .then(connection=>{
        console.log("saved");
        res.redirect('/connections');
    })
    .catch(err=>{
        console.log(err);
        if(err.name === 'ValidationError' ){
            err.status = 400;
        }
        //next(err);
    });
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(id).populate('author', 'firstName lastName')
    .then(connection=>{
        if(connection) {          
            return res.render('connection', {connection});
        } else {
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection=>{
        if(connection) {
            return res.render('edit', {connection});
        } else {
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let connection = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, connection, {runValidators: true})
    .then(connection=>{
        if(connection) {
            res.redirect('/connections/'+id);
         } else {
             let err = new Error('Cannot find a connection with id ' + id);
             err.status = 404;
             next(err);
         }
     })
     .catch(err=>{
        if(err.name === 'ValidationError' ){
            err.status = 400;
        }
        next(err);
    }); 
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    model.findByIdAndDelete(id)
    .then(connection=>{
        if(connection) {
            res.redirect('/connections/');
         } else {
             let err = new Error('Cannot find a connection with id ' + id);
             err.status = 404;
             next(err);
         }
     })
     .catch(err=>next(err));
    }; 