// controllers/formationsController.js
const Formation = require('../models/formation.model');
const Joi=require('joi');

const formationValidationSchema = Joi.object({
    titre: Joi.string().required().min(3).max(25),
    description: Joi.string().required(),
    date_debut: Joi.date().required(),
    date_fin: Joi.date().required(),
    
});

const creatformation = async (req, res) => {
    try {
        const { error } = formationValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { titre, description, date_debut, date_fin } = req.body;
        
        const formation = await Formation.create({ titre, description, date_debut, date_fin });
        res.status(201).json(formation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// READ: Obtenir toutes les formations
const getAllFormations = async (req, res) => {
    try {
        const formations = await Formation.find();
        res.json(formations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE: Mettre à jour une formation existante
const updateFormation = async (req, res) => {
    try {
        const formation = await Formation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(formation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE: Supprimer une formation existante
const deleteFormation = async (req, res) => {
    try {
        await Formation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Formation supprimée avec succès.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getoneformation=async(req,res)=>{
    try{
        const formation = await Formation.findById(req.params.id);
        res.json(formation);
    }catch(error){
        console.log("error")
    }
}
module.exports = {
    creatformation,
    getAllFormations,
    updateFormation,
    deleteFormation,
    getoneformation
};
