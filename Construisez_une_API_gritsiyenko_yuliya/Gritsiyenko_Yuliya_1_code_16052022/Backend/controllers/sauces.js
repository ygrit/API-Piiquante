const Sauce = require('../models/Sauce');

// accés au file system pour pouvoir supprimer les fichiers par example
const fs = require('fs');

// Requête Méthode Post pour créer une sauce
exports.createSauce =  async (req, res, next) => {
    //pour inserer l'image - objet de javascript sous chaine de caractères
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    //console.log("...")
    const sauce = new Sauce({

      ...sauceObject,
      /*configuration d'adresse de téléchargement d'image(http ou https +host de serveur3000+dossier+nom de fichier multer)*/
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    try {
        //console.log("err1")
        //enregistre dans la base de données et renvoie une promise
        await sauce.save();
        //console.log("err2")
        //une réponse
        res.status(201).json({ message: 'Sauce enregistrée !' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Requête méthode Put pour faire des modifications par l'id
exports.modifySauce = (req, res, next) => {
    
    //pour les images
    const sauceObject = req.file ?
    // si file existe, - on récuper objet et modifie l'image  
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        
    } : 
    // et si file n'existe pas on récupere le corps de la requête
    { ...req.body };
    

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }

// Requête méthode Delete pour supprimer la sauce selon l'id
exports.deleteSauce = (req, res, next) => {

    //trouver l'image dans la base de donées
    Sauce.findOne({ _id: req.params.id })
    /*.then((sauce) => {
        if (!sauce) {
            return res.status(404).json({
                error: new Error('Objet non trouvé !')
            });
        }
        if (sauce.userId !== req.auth.userId) {
            return res.status(401).json({
                error: new Error('Requête non authorisée !')
            });
        }
        
        if (req.body.userId !== userId){
            res.status(403).json({ message: 'Requête non authorisée' })
        }
        return sauce;
    })*/
        
        .then(sauce => {
            //on extrait le nom de fichier à supprimer
            const filename = sauce.imageUrl.split('/images/')[1];
            //on supprime le lien, fichier: path et callback
            fs.unlink(`images/${filename}`, () => {
            // on supprime le fichier de la base
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                .catch(error => res.status(400).json({ error }));
          });
        })
        .catch(error => res.status(500).json({ error }));
    };
        
 
// Requête méthode Get pour obtenir une sauce par l'id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
      //s'il ne trouve pas de sauces ou erreur - l'envoyer au front-end
  };

// Requête méthode Get pour obtenir toutes les sauces dans la base de données
exports.getAllSauces = (req, res, next) => {
    //pour renvoyer un tableau contenant tous les sauces
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))

      .catch(error => res.status(400).json({ error }));
  };
