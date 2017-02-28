//require depenciess
var express = require('express');
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
