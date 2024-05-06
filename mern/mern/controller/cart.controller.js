const CartItem = require('../model/cart.model');
const Book = require('../model/book.model');



exports.addToCart = async (req, res) => {
  const { bookName } = req.params; // Get productId from the URL params
  const { username } = req.session;

  try {
    // Find the product by productId
    const book = await Book.findOne({ bookName });
    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }

    // Check if the product already exists in the cart
    let cartItem = await CartItem.findOne({ bookName, userName: username });

    // Create a new CartItem instance if the product is not in the cart
    if (!cartItem) {
      cartItem = new CartItem({
        bookName: book.bookName,
        bookDescription: book.description,
        bookImage: book.bookimage,
        bookPrice: book.yourPrice,
        userName: username,

      });


      
      // Save/update the cart item in the MongoDB collection
      const savedCartItem = await cartItem.save();

      res.status(201).json(savedCartItem); // Respond with the saved cart item
    } else {
      res.status(200).json(cartItem); // If the item already exists, respond with the existing cart item
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const username=req.session.username;
    // console.log('name',username);
      const cartitems = await CartItem.find({userName: username});
      res.render('cart', { cartitems, username });
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).send('Error fetching cart');
  }
};



// Express route handling deletion of cartproducts by ID
exports.deleteCartItem = async (req, res) => {
  const cartId = req.params.cartId;
  try {
      
    const deletedbook = await CartItem.findByIdAndDelete(cartId);
    if (deletedbook) {
        return res.status(200).send('Cartproduct deleted successfully');
    } else {
        return res.status(404).send('cartproduct not found');
    }// Your logic to delete the user with the provided userId
      // Example: await User.findByIdAndDelete(userId);
     // res.status(200).send('User deleted successfully');
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Server error');
  }
};

// DELETE route to delete all items from the cart
