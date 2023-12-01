const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
  
// Configuration
const storage = multer.diskStorage({
    // Enregistrement des fichiers dans le dossier images
    destination: (req, file, callback) => {
      callback(null, 'images');
    },

    
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);

    }    
});

module.exports = multer ({storage}).single('image');


// // Redimensionnement de l'image
// module.exports.resizeImage = (req, res, next) => {
//     // On vérifie si un fichier a été téléchargé
//     if (!req.file) {
//       return next();
//     }
  
//     const filePath = req.file.path;
//     const fileName = req.file.filename;
//     const outputFilePath = path.join('images', `resized_${fileName}`);
  
//     sharp(filePath)
//       .resize({ width: 450, height: 450 })
//       .toFile(outputFilePath)
//       .then(() => {
//         // Remplacer le fichier original par le fichier redimensionné
//         fs.unlink(filePath, () => {
//           req.file.path = outputFilePath;
//           next();
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         return next();
//       });
//   };