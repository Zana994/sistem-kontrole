const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const controlSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  organisation: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  result: {
    type: String,
    required: true
  },
  product_safety: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Control', controlSchema);