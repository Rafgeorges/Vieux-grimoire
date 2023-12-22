const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require ('../middleware/multer-config');

const CtrlBooks = require('../controllers/Ctrl_books')





router.post('/', auth, upload, upload.resizeImage, CtrlBooks.createBook);
router.get('/', CtrlBooks.getAllBooks);
router.get('/bestrating', CtrlBooks.getBestRating);
router.get('/:id', CtrlBooks.getOneBook);
router.delete('/:id', auth, CtrlBooks.deleteBook);
router.post('/:id/rating', auth, CtrlBooks.createRating);
router.put('/:id', auth, upload, upload.resizeImage, CtrlBooks.modifyBook);


module.exports = router
