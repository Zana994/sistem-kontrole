const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organisationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  inspectorate: {
    type: String,
    required: true
  },
  jurisdiction: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Organisation', organisationSchema);