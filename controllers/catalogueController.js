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




exports.formationList = function(req,res){
    connection.query("select * from formation;",function(error,result){
        if(error) console.log(error);
        res.render('catalogue.ejs',{catalogue:result});
    });

}
