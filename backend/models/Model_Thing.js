const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String, },
  imageUrl: { type: String,  },
  userId: { type: String,  },
  price: { type: Number,  },
});

module.exports = mongoose.model('Model_Thing', thingSchema);