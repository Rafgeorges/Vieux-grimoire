const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const CtrlUser = require('../controllers/Ctrl_user')

router.post('/signup', CtrlUser.signup)
router.post('/login', CtrlUser.login)



module.exports = router;