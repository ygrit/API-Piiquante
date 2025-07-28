const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const likeCtrl = require('../controllers/like');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Requête Méthode Post
//   '/'= '/api/sauces'
router.post('/', auth, multer, saucesCtrl.createSauce);

//Requête Post por des likes
router.post('/:id/like', auth, likeCtrl.likeSauce);

// Requête méthode Put pour faire des modifications par l'id
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Requête méthode Delete pour supprimer selon l'id
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Requête méthode Get pour 1 sauce par id
router.get('/:id', auth, saucesCtrl.getOneSauce);


// Requête méthode Get pour tous les sauces dans la base de données
router.get('/', auth, saucesCtrl.getAllSauces);


module.exports = router;