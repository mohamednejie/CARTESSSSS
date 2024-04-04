const mongoose = require('mongoose');

const reunionSchema = new mongoose.Schema({
    titre: { type: String,
         required: true 
        },
    description: {
         type: String 
        },
    date_debut: {
     type: Date 
         },
    date_fin: {
         type: Date
         },
     lieu: {
            type: String
            }

});

module.exports = mongoose.model('reunion', reunionSchema);
