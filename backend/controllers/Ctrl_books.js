const ModelBook = require('../models/Model_Book')
const average = require('../middleware/Average');
const fs = require('fs');
 
  
  
  // POST
  exports.createBook = (req, res, next) => {
  // Stockage de la requête sous forme de JSON dans une constante (requête sous la forme form-data à l'origine)
   const bookItem = JSON.parse(req.body.book);
   delete bookItem._id;
   delete bookItem._userId;
   
    //création d'un objet book
    const book = new ModelBook({
      ...bookItem,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`,

    });
    book.save()
    .then(() => res.status(201).json({message : 'Objet enregistré' , data : book}))
    .catch(error => res.status(400).json({ error }));
  };




// GET ALL BOOKS
exports.getAllBooks = (req, res, next) => {
    // Renvoie un tableau contenant tous les Books de la base de données
    ModelBook.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }));
};



// GET ONE BOOK
exports.getOneBook = (req, res, next) => {
  ModelBook.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
};


// PUT => MODIFY ONE BOOK
exports.modifyBook = (req, res, next) => {
  // Stockage de la requête en JSON dans une constante
  const bookItem = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}` 
  } : { ...req.body };
  // Suppression de _userId auquel on ne peut faire confiance
  delete bookItem._userId;
  // Récupération du livre existant à modifier
  ModelBook.findOne({_id: req.params.id})
      .then((book) => {
          // Le livre ne peut être mis à jour que par le créateur de sa fiche
          if (book.userId != req.auth.userId) {
              res.status(403).json({ message : '403: unauthorized request' });
          } else {
              // Séparation du nom du fichier image existant
              const filename = book.imageUrl.split('/images/')[1];
              // Si l'image a été modifiée, on supprime l'ancienne
              req.file && fs.unlink(`images/${filename}`, (err => {
                      if (err) console.log(err);
                  })
              );
              // Mise à jour du livre
              ModelBook.updateOne({ _id: req.params.id }, { ...bookItem, _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                  .catch(error => res.status(400).json({ error }));
          }
      })
      .catch((error) => {
          res.status(404).json({ error });
      });
};


// DELETE A BOOK
exports.deleteBook = (req, res, next) => {
  // Récupération du livre à supprimer
  ModelBook.findOne({ _id: req.params.id })
      .then(book => {
          // Le livre ne peut être supprimé que par le créateur de sa fiche
          if (book.userId != req.auth.userId) {
              res.status(403).json({ message: '403: unauthorized request' });
          } else {
              // Séparation du nom du fichier image
              const filename = book.imageUrl.split('/images/')[1];
              // Suppression du fichier image puis suppression du livre dans la base de données dans la callback
              fs.unlink(`images/${filename}`, () => {
                  ModelBook.deleteOne({ _id: req.params.id })
                      .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                      .catch(error => res.status(400).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(404).json({ error });
      });
};

// POST => Création d'une note
exports.createRating = (req, res, next) => {
  // On vérifie que la note est comprise entre 0 et 5
  if (0 <= req.body.rating <= 5) {
      // Stockage de la requête dans une constante
      const ratingObject = { ...req.body, grade: req.body.rating };
      // Suppression du faux _id envoyé par le front
      delete ratingObject._id;
      // Récupération du livre auquel on veut ajouter une note
      ModelBook.findOne({_id: req.params.id})
          .then(book => {
              // Création d'un tableau regroupant toutes les userId des utilisateurs ayant déjà noté le livre en question
              const newRatings = book.ratings;
              const userIdArray = newRatings.map(rating => rating.userId);
              // On vérifie que l'utilisateur authentifié n'a jamais donné de note au livre en question
              if (userIdArray.includes(req.auth.userId)) {
                  res.status(403).json({ message : 'Not authorized' });
              } else {
                  // Ajout de la note
                  newRatings.push(ratingObject);
                  // Création d'un tableau regroupant toutes les notes du livre, et calcul de la moyenne des notes
                  const grades = newRatings.map(rating => rating.grade);
                  const averageGrades = average.average(grades);
                  book.averageRating = averageGrades;
                  // Mise à jour du livre avec la nouvelle note ainsi que la nouvelle moyenne des notes
                  ModelBook.updateOne({ _id: req.params.id }, { ratings: newRatings, averageRating: averageGrades, _id: req.params.id })
                      .then(() => { res.status(201).json()})
                      .catch(error => { res.status(400).json( { error })});
                  res.status(200).json(book);
              }
          })
          .catch((error) => {
              res.status(404).json({ error });
          });
  } else {
      res.status(400).json({ message: 'La note doit être comprise entre 1 et 5' });
  }
};


// GET => Récupération des 3 livres les mieux notés
exports.getBestRating = (req, res, next) => {
    // Récupération de tous les livres
    // Puis tri par rapport aux moyennes dans l'ordre décroissant, limitation du tableau aux 3 premiers éléments
    ModelBook.find().sort({averageRating: -1}).limit(3)
        .then((books)=>res.status(200).json(books))
        .catch((error)=>res.status(404).json({ error }));
};

