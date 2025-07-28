const mongoose = require('mongoose');

//validator pour email
const uniqueValidator = require('mongoose-unique-validator');

//schéma de données d'utilisateur
const userSchema = new mongoose.Schema({
  
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
  
  module.exports = mongoose.model('User', userSchema);