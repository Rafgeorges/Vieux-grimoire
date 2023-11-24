const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title:  String ,
  description:  String, 
  imageUrl:  String,  
  userId:  String,  
  price:  Number,  
});

module.exports = mongoose.model('Model_Thing', thingSchema);