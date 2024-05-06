const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({ // Link to user ID
  
  bookName: String,
  username: String,
  bookImage: 
  {
    data: Buffer,
    contentType: String
  }, // Image URL or path
  bookPrice: Number, // Price of the product
  bookDescription: String,
 
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;