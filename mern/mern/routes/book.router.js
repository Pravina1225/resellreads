const express = require('express');
const router = express.Router();
const bookController = require('../controller/book.controller');
const upload = require('../middleware/upload')


router.post("/sellbook",upload.single('bookimage'),bookController.uploadBook);


router.get("/getallbooks",bookController.getAllBooks);
router.get("/getbyid/:id",bookController.getBookById);


router.put("/update/:id",upload.single('image'),bookController.updateBook);
router.delete("/delete/:id",bookController.deleteBook);

const bookdescController = require('../controller/bookdescController');
router.get('/bookdesc', bookdescController.getbookdescpage);

module.exports = router;
                        










                  