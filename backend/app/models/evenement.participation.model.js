const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Référence à l'utilisateur qui participe
        required: true
    }
});

const Participation = mongoose.model('Participation', participationSchema);

module.exports = Participation;
