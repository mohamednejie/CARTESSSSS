// formation.model.js
const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  description: {
    type: String,
    required: true
  },
  date_debut: {
    type: Date,
    required: true
  },
  date_fin: {
    type: Date,
    required: true
  }
});

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
