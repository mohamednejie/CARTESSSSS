const evenement = require('../models/evenement.model');
const Joi = require('joi');
const Participation = require('../models/evenement.participation.model');
const File = require('../models/file.model'); // Importez le modèle de fichier
const fs = require('fs');

// Schéma de validation avec Joi
const evenementValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    date: Joi.date().required(),
    lieu: Joi.string().required(),
    description: Joi.string().required(),
    duree: Joi.string().trim().required(),
  });
  
  exports.createevenement = async (req, res) => {
    try {
      const { name, date, lieu, description, duree } = req.body;
      saveFileToDatabase
      let fileId = null;
      if (req.file) {
        const newFile = new File({
          filename: req.file.originalname,
          path: req.file.path,
          contentType: req.file.mimetype
        });
  
        const savedFile = await newFile.save();
        fileId = savedFile._id;
      }
  
      const newevenement = new evenement({ name, date, lieu, description, duree, fileId });
      const savedevenement = await newevenement.save();
      res.json(savedevenement);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const saveFileToDatabase = async (filename, path, contentType) => {
    try {
        // Enregistrer le fichier sur le disque
        const destinationPath = 'C:\\Users\\lenovo\\OneDrive\\Bureau\\backend\\uploads\\' + filename;
        fs.writeFileSync(destinationPath, fs.readFileSync(path));

        // Enregistrer les informations du fichier dans la base de données
        const newFile = new File({
            filename: filename,
            path: path,
            contentType: contentType
        });
        const savedFile = await newFile.save();
        console.log('File saved to database:', savedFile);
        return savedFile; // Retourne le fichier enregistré
    } catch (error) {
        console.error('Error saving file to database:', error);
        throw error; // Gérer l'erreur ou la renvoyer pour un traitement ultérieur
    }
};
exports.getAllevenement = async (req, res) => {
    try {
        const evenements = await evenement.find();
        res.json(evenements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOneEvenement = async (req, res) => {
    const eventId = req.params.id;
    try {
        const evenements = await evenement.findById(eventId);
        if (!evenements) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.json(evenements);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement' });
    }
};

exports.updateevenement = async (req, res) => {
    try {
        const { id } = req.params;
        

        const { name, date, lieu, description, duree,file } = req.body;
        const updatedevenement = await evenement.findByIdAndUpdate(id, { name, date, lieu, description, duree,file }, { new: true });
        res.json(updatedevenement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteevenement = async (req, res) => {
    try {
        const { id } = req.params;
        await evenement.findByIdAndDelete(id);
        res.json({ message: "evenement deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.participate = async (req, res) => {
    try {  
        const { eventId } = req.params;
        const {  userId } = req.body;
        const participation = new Participation({ eventId, userId });
        await participation.save();
        res.json(participation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getparticipate=async(req,res)=>{
    try{  
   
        const participate=await Participation.find();
        res.json(participate) 

    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.cancelParticipation = async (req, res) => {
    try {
        const { eventId } = req.params;
        const {  userId } = req.body;
        await Participation.findOneAndDelete({ eventId, userId });
        res.json({ message: "Participation canceled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
