const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const CtrlBooks = require('../controllers/Ctrl_books')








router.post('/', auth,  CtrlBooks.createBook);
router.get('/', auth, CtrlBooks.getAllBooks);

module.exports = router
