const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const bodyParser = require('body-parser');    déja intégré dans l'express
//app.use(bodyParser.json());
require('dotenv').config();

//donne l'access au chemin de système de fichiers(pour les images à ajouter)
app.use(express.json());
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')


// connection à la base avec un pseudo et mot de passe                 

// Mais pour la Production on utilise:
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })

    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//middleware général pour l'API
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Eequested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// attribue un middleware à une route spécifique
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;







