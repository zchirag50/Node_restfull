var express = require('express')
var app = express()
var mongoose= require('mongoose');
var bodyParser = require('body-parser');
//var db= mongoose.connect('mongodb://chirag:chirag@ds011870.mlab.com:11870/mytest');

var db;
if(process.env.ENV == 'Test')
    db= mongoose.connect('mongodb://localhost:27017/bookAPI-test');
else
    db= mongoose.connect('mongodb://localhost:27017/bookAPI');

var port= process.env.PORT || 3012;

var Book= require('./Model/bookModel');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/book',bookRouter);


app.get('/', function (req, res) {
  res.send('Hello World1234!')
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})

module.exports= app;