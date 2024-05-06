const Book = require('../model/book.model'); // Import the Product model

exports.getbookdescpage = async (req, res) => {
    try {
      const bookid = req.query.bookobjid; 
    //   console.log(bookid);
    //   const username = req.session.username;// Get the category name from the query parameter
      
      // Fetch products based on the received category name from the database 
      const books = await Book.find({ _id: bookid }).exec();// Adjust this query based on your database structure
    //   console.log(books);
      // Log the values before rendering the view
      // Render the category page with the fetched products
      res.render('bookdesc', { books}); // Pass categoryName and products to your category view
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
