const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({ // Link to user ID
  username: String,
  bookName: String,
  bookImage: 
  {
    data: Buffer,
    contentType: String
  }, // Image URL or path
  yourPrice: Number, // Price of the product
  description: String,
 
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;