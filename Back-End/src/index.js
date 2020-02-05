const express = require("express");  //import
const bodyParser=require("body-parser");
const session = require('express-session');
var nodemailer = require('nodemailer');
require('./dbConnection');
var app = express();                 //call constructor of library express
var users = require('./routes/users');
var books = require('./routes/books');
const path = require('path');
const UsersModel = require('./models/users');

var cookieValidator = (req, res, next) => {
  if (req.session.userName) {
      UsersModel.findUsers(req, (err, res) => {
          if (err) res.status(401).send({message:"User not authenticated"});
          if (res && res.length == 0) {
              res.status(401).send({message:"User not authenticated"});
          }
          if (res && res.length > 0) {
              next();
          }
      })
  } else {
      res.status(401).send({message:"User not authenticated"});
  }
}

    

//8080 is a non-secure port.mostly used for development purposes.

// app.METHODNAME('path',handler()=>{})


app.use(bodyParser.json());  //any incoming request must go through bodyparser.so that it can parse json.

app.use(session({
  key: "libraryn",
  secret: "librarysecretn",
  saveUninitialized : true,
  resave : true
}))


app.use(express.static('public'));


//sample middleware
app.use("*",(req,res,next)=>{
    console.log("Middle ware is called");
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With,Accept");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Credentials","true");
    
    next();
})


app.use('/users',users);
app.use('/books',cookieValidator,books);
app.get("*",(req,res)=> {
    res.sendFile(path.join(__dirname , '../library-routing','build','index.html'));   //sending a string to frontend
})

app.listen(8081, () => {
    console.log('Server is listening at port no 8081');
})