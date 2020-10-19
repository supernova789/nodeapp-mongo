const http = require('http');
var express = require('express');
const path = require('path');


const mongoose = require("mongoose");


const {
  MONGO_URL,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD
}  = process.env;

// Connect to the db

// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb://mongodb-1602668407.avi-namespace.svc.cluster.local:27017/local", function (err, db) {
   
//      if(err){
//       throw err;
//      }else{
//       console.log("Database connected!");
//      }
                
// });



//Mongoose package for DB connection
mongoose.connect('mongodb://'+MONGO_URL+'/'+MONGO_DATABASE, 
{ 
  useNewUrlParser: true,
  auth: {
    user: MONGO_USERNAME,
    password: MONGO_PASSWORD
   } 
}
).then(() => {
    console.log("DB connected")
}).catch((err)=> {
    console.log("ERROR")
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected to Mongo!");
});

var app = express();

app.use('/css',express.static(__dirname +'/css'));

app.use(express.json());

// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
    //__dirname : It will resolve to your project folder.
  });
  
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});