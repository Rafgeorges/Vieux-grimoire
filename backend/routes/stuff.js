const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/ctrl_stuff');

//Appel des controleurs
router.post('/', stuffCtrl.createThing);


module.exports = router;