const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/route_user');
const booksRoutes = require('./routes/route_books')

const app = express();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Middleware pour parser le corps des requêtes de formulaire
app.use(express.urlencoded({ extended: true }));
  
//Lien avec MongoDB
mongoose.connect('mongodb+srv://user1:user1password@cluster0.vrm0md5.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  


//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 
  

// // Gestion de la ressource images de manière statique
// app.use('/images', express.static(path.join(__dirname, 'images')));


// Utilisation des routes
app.use('/api/auth', userRoutes);
app.use('/api/books', booksRoutes)

module.exports = app;