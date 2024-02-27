const mongoose = require('mongoose');

const p = new mongoose.Schema({
  idOffre : {
    type : String,
    required : true
  }
  ,
  idCandidat :  {
    type : String,
    required : true
  },
  letter : {
    type : String,
    require : true
  },
  cvLink : {
    type : String,
    require : false
 }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Postule = mongoose.model('postule', p);

module.exports = Postule;