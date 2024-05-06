const CartItem = require('../model/cart.model');
const Book = require('../model/book.model');



exports.addTowishlist = async (req, res) => {
  const { bookName } = req.params; // Get productId from the URL params
  const userName = req.session.username;
       
      //  console.log(bookName);
  try {
    // Find the product by productId
    const book = await Book.findOne({ bookName });
    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }

    // Check if the product already exists in the cart
    let cartItem = await CartItem.findOne({ bookName , username:  userName});
    // console.log(cartItem);
    // Create a new CartItem instance if the product is not in the cart
    if (!cartItem) {
      cartItem = new CartItem({
        bookName: book.bookName,
        username: userName,
        bookDescription: book.description,
        bookImage: book.bookimage,
        bookPrice: book.yourPrice,
        
      });
console.log(cartItem);
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

     console.log('username',username);
      const wishitems = await CartItem.find({username: username});
      res.render('wishlist', { wishitems, username });
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).send('Error fetching cart');
  }
};



// Express route handling deletion of cartproducts by ID
exports.deleteCartItem = async (req, res) => {
  const bookname = req.params.bookname;
  const username=req.session.username;
  console.log('nameeeeeeeeeeeeee:',username);
  try {
      
    const deletedbook = await CartItem.findOneAndDelete({ bookName: bookname, username: username });

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
