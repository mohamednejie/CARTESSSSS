
const reunion = require('../models/reunion.model');
const Joi=require('joi')
const  reunionValidationSchema=Joi.object({
    titre: Joi.string().required().min(3).max(25),
    description: Joi.string().required(),
    date_debut: Joi.date().required(),
    date_fin: Joi.date().required(),
    lieu: Joi.string().required(),

});
const createreunion = async (req, res) => {
    try {
        const { error } = reunionValidationSchema.validate(req.body);
        if (error){
            return res.status(400).json({ error: error.details[0].message });
        }
        const { titre, description, date_debut, date_fin,lieu } = req.body;
        console.log('Données reçues :', req.body); 
        // Valider le format de la date de début
        const dateDebutRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateDebutRegex.test(date_debut) || !dateDebutRegex.test(date_fin)) {
            return res.status(400).json({ message: 'Format de date  invalide.' });
        }

        const reunions = await reunion.create({ titre, description, date_debut, date_fin,lieu });
        res.status(201).json(reunions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getallreunion = async (req, res) => {
    try {
        const reunions = await reunion.find();
        res.json(reunions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getonereunion = async (req, res) => {
    const reunionId = req.params.id; 
    try {
        const reunions = await reunion.findById(reunionId); 
        if (!reunions) {
            return res.status(404).json({ message: 'reunion non trouvé' });
        }
        res.json(reunions);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur lors de la récupération de la reunions' });
    }
};
const updatereunion = async (req, res) => {
    try {
        const reunions = await reunion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(reunions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deletereunion= async (req, res) => {
    try {
        await reunion.findByIdAndDelete(req.params.id);
        res.json({ message: 'reunion supprimée avec succès.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createreunion,
    getallreunion,
    updatereunion,
    deletereunion,
    getonereunion
};
