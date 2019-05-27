var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port=process.env.PORT||3000;
const MongoClient=require('mongodb').MongoClient;
const dbUrl='mongodb+srv://omar:Passowrd@cluster0-bnl9p.mongodb.net/test?retryWrites=true';
const dbName="prototypeDb";
const url=require('url')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);



//!mongo stuff 
const user={
  username:"Mostafa1",
  password:"33333333333"

}

app.get('/', (req,res)=>{
  checkUesr(user.username,(check)=>{
    if(check){
      (async function mongo(){
        let client;
        try {
          client= await MongoClient.connect(dbUrl,{useNewUrlParser:true});
          const db=client.db(dbName);
          const response= await db.collection('users').insertOne(user);
          res.send(response)
        } catch (error) {
          res.send(error.message)
          
        }
        client.close();
      }())
    } else{
      res.send("user name is already exist please choos another one");}
  })
  
});
//!
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
