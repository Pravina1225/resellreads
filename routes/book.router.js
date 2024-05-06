const express = require('express');
const router = express.Router();
const bookController = require('../controller/book.controller');
const upload = require('../middleware/upload')


router.post("/sellbook",upload.single('bookimage'),bookController.uploadBook);


router.get("/getallbooks",bookController.getAllBooks);
router.get("/getmyads",bookController.getmyadspage);
 


router.put("/update/:id",upload.single('image'),bookController.updateBook);
router.delete("/deletebook/:bookid",bookController.deleteBook);

const bookdescController = require('../controller/bookdescController');
router.get('/bookdesc', bookdescController.getbookdescpage);

const cartController = require('../controller/cart.controller');
router.post('/add-to-wishlist/:bookName', cartController.addTowishlist);
router.get('/wishlist', cartController.getCartItems);
router.delete('/deletecartbook/:bookname', cartController.deleteCartItem);

module.exports = router;
                        










                  