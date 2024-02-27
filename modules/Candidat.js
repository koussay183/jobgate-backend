const mongoose = require('mongoose');

const c = new mongoose.Schema({
  fullName: {
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

const Candidat = mongoose.model('candidat', c);

module.exports = Candidat;