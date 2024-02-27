const mongoose = require('mongoose');

const e = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const Entreprise = mongoose.model('entreprise', e);

module.exports = Entreprise;