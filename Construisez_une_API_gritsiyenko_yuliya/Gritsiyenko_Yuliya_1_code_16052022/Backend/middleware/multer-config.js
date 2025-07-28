const multer = require('multer');

//detérmine les type des images à ajouter
const MIME_TYPES = {
'image/jpg': 'jpg',
'image/jpeg': 'jpg',
'image/png': 'png',
};

//pour les images à ajouter
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        //direction de dossier
        callback(null, 'images');
    },
    //nom de fichier+extension
    filename: (req, file, callback) =>{
       // const name = file.originalname[0].replace(/[^a-zA-Z0-9 .!?]+/g, '').split(".");
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
// single > pour ajouter le fichier unique, pas l'ajout grouppé
module.exports = multer({ storage }).single('image');