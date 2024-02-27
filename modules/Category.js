const mongoose = require('mongoose');

const c = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Candidat = mongoose.model('category', c);

module.exports = Candidat;