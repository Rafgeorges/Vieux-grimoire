const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

const CtrlBooks = require('../controllers/Ctrl_books')





router.post('/', auth, multer, CtrlBooks.createBook);
router.get('/', multer, CtrlBooks.getAllBooks);
router.get('/:id', multer, CtrlBooks.getOneBook);
router.put('/', auth, multer, CtrlBooks.modifyBook );
router.delete('/:id', auth, CtrlBooks.deleteBook);
router.post('/:id/rating', auth, CtrlBooks.createRating);
router.put('/:id', auth, multer, multer.resizeImage, CtrlBooks.modifyBook);
router.get('/bestrating', CtrlBooks.getBestRating)


module.exports = router
