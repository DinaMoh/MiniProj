//require depenciess
var express = require('express');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('client-sessions');
var DB_URI = "mongodb://localhost:27017/portfolio";
var app = express();
var path = require('path');
var fs = require('fs');
app.set('view engine', 'ejs');
// configure app

// app.use(multer({
//   dest: 'uploads/',
//   rename: function(fieldname, filename){
//     return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
//   },
//   onFileUploadStart: function(file){
//     console.log(file.fieldname + ' is starting ...')
//   },
//   onFileUploadData: function(file, data){
//     console.log(data.length + ' of ' + file.fieldname + ' arrived')
//   },
//   onFileUploadComplete: function(file){
//     console.log(file.fieldname + ' uploaded to ' + file.path)
//   }
// }).single('userPhoto'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

mongoose.connect(DB_URI);
app.use(router);


// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})
