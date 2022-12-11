let express=require('express');
let app=express();
let session=require('express-session');
app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized: true
})
);



app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


let router = require('./routes');
app.use('/', router);

 app.listen(3000,function(){
    console.log('Runnings on port 3000');
 })