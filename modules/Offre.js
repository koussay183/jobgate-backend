const mongoose = require('mongoose');

const o = new mongoose.Schema({
  title : {
    type : String,
    required : true
  }
  ,desc : {
    type : String,
    required : true
  },
  idEntreprise : {
    type : String,
    required : true
  },
  idCategory : {
    type : String,
    required  : true
  },imageUrl : {
    type : String
  }

});

const Entreprise = mongoose.model('offre', o);

module.exports = Entreprise;