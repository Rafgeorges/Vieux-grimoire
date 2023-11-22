const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();
//On importe les routes
const stuffRoutes = require('./routes/stuff');



// On exporte les requêtes vers le dossier routes
app.use('/api/stuff', stuffRoutes);

mongoose.connect('mongodb+srv://user1:user1password@cluster0.vrm0md5.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




module.exports = router;