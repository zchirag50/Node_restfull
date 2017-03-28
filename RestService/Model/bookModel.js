var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
  title:  {type : String},
  auther: {type : String},
  genre:   {type : String},
  read :{type : Boolean, default: false}
  }
);

module.exports= mongoose.model('Book',bookModel);