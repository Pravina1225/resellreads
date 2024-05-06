const express = require("express");
const router = express.Router();
const cartController = require('../controller/cart.controller');




router.get('/cart', cartController.getCartItems);
// router.get('/cart-count', cartController.getCartCount);
router.post('/add-to-cart/:bookName', cartController.addToCart);
router.delete('/deletecartbook/:cartId', cartController.deleteCartItem);
// router.delete('/deleteAllCartItems', cartController.deleteAllCartItems);
// router.put('/updateCartItem/:cartId', cartController.updateCartItemQuantity); 