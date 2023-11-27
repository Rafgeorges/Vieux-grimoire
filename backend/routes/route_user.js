const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const CtrlUser = require('../controllers/Ctrl_user')

router.post('/signup', auth, CtrlUser.signup)
router.post('/login', auth, CtrlUser.login)



module.exports = router;