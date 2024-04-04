const mongoose = require('mongoose');

const evenementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duree: {
        type: String,
        required: true
    },
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        default: null
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const evenement = mongoose.model('evenement', evenementSchema);

module.exports = evenement;
