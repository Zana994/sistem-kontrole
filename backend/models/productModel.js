const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    requred: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  serial_number: {
    type: String
  },
  country_of_origin: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);