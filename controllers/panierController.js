let express = require('express');
let app = express();

app.use(express.urlencoded({
    extended : true
}));

var mysql = require("mysql");
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '1234',
    database    : 'catalogue'   
});

connection.connect(function(error,result){
    if(error) console.log(error);
    console.log(result);    
});



formationinscrit=[];
exports.addFormation = function(req,res){
    v=0;
    for(let i=0 ;i< formationinscrit.length;i++){
        if(formationinscrit[i]== req.body.formation){v = v+1;}
   }
   if (v==0){formationinscrit.push(req.body.formation);}
}

exports.showPanier = function(req,res){
    connection.query("select * from formation;",function(error,result){
        if(error) console.log(error);
        res.render('panier.ejs',{
            catalogue:result,          
        });
    });   
}
exports.deleteFormation= function(req,res){
    for(let i=0 ;i< formationinscrit.length;i++){
        if(formationinscrit[i]== req.body.formationdelete ){
            formationinscrit.splice(i,1);
        }     
    } 
    res.redirect('/panier');
}

const commande = require('../models/panierModel');

exports.finaliser=function(req,res){
    if(req.session.user === undefined){
        res.render('finaliser.ejs')
    }
    else{
        formationstring = formationinscrit.toString();
        let commande0 = new commande(req.session.user,formationstring );
        
        console.log(commande0);
        formationinscrit=[];
        connection.query("INSERT INTO commande SET ? ", commande0, function(err,result){
            if(err) console.log(err);
        res.send("L'inscription est finaliser");
        });
    }
}


exports.prefinaliser=function(req,res){
    req.session.user =req.body.username;
    formationstring = formationinscrit.toString();
    let commande0 = new commande(req.session.user,formationstring );
    console.log(commande0);
    formationinscrit=[];
    connection.query("INSERT INTO commande SET ?", commande0, function(err,result){
        if(err) console.log(err);
    res.send("L'inscription est finaliser");
    });
};
