const bcrypt = require('bcrypt');
const User = require('../models/Model_User');


// SIGNUP
exports.signup = (req, res, next)=> {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(()=> res.status(201).json({message: 'utilisateur créé !'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};


// LOGIN
exports.login= (req, res, next)=> {

};