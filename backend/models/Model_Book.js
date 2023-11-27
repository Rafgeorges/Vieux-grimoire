const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title:  String ,
  author:  String, 
  genre:  String,  
  year:  Number,
  imageUrl: String  
});

module.exports = mongoose.model('Model_Book', thingSchema);