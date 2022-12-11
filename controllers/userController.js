
let express = require('express');
let app = express();

app.use(express.urlencoded({
    extended : true
}));
const superuser = require('../models/userModel');

exports.username = function(req,res){
    req.session.user =req.body.username;
    id = req.session.id;
    surname = req.body.username;
    let user = new superuser(id,surname);
    console.log(user);    
    res.redirect('/catalogue');
}

exports.connection = function(req,res){
    res.render('user.ejs');
}
