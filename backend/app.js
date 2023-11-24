const express = require('express');
const mongoose = require('mongoose');
const Model_Thing = require('./models/Model_Thing');
const userRoutes = require('./routes/route_user');

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
  
  //REQUETES
  
  
  app.post('/api/test', (req, res) => {
    console.log(req.body);
    res.send('Test réussi !');
  });
  
  // POST
  app.post('/api/books', (req, res, next) => {
    const newThing = new Model_Thing({
      ...req.body,
    });
    newThing.save()
    .then(() => res.status(201).json({message : 'success' , data : newThing}))
    .catch(error => res.status(400).json({ error }));
  });
  
  // FIND
  app.use('/api/books', (req, res, next) => {
    Model_Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });


//  GET 
  app.get('/api/books/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });




app.use('/api/auth', userRoutes);

module.exports = app;