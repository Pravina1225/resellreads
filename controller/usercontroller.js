
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');

const signUp =  async (req, res) => {
  // Signup logic remains the same
  try {
    const { username, password, email } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({  username });

    if (existingUser) {
      req.flash('error', 'Username or email already exists. Please choose a different username or email.');
      return res.redirect('/signup');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    await user.save();

    // Redirect to login after successful signup
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const login =  async (req, res) => {
  // Login logic remains the same
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      req.flash('error', 'Invalid username or password');
      return res.redirect('/login');
    }
      // check the password
   const match = await bcrypt.compare(password.trim(), user.password);

    if (match) {
      // console.log('Loaded Environment Variables:', process.env);

    //   console.log('Secret Key:', process.env.SECRET_KEY);
    //   const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    //   req.session.token = token;
      
    //   // Add username to the session
    //   req.session.username = username;
    //   return res.redirect('/home');
    // } else {
    //   req.flash('error', 'Invalid username or password');
    //   return res.redirect('/login');
    
     // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    req.session.token = token;
      
    //   // Add username to the session
      req.session.username = username;
    // Set the token in the cookie
    res.cookie('token', token);

    // Redirect to the index page after successful login
     res.render('home',{ username });
     
  
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const authenticateToken = async (req, res, next) => {
  // Authentication middleware logic remains the same
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  jwt.verify(token, 'secret_key', async (err, decoded) => {
    if (err) {
      return res.redirect('/login');
    }

    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.redirect('/login');
      }

      req.user = { userId: decoded.userId, username: user.username };
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
};
const logout = async (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

// router.get('/signup', (req, res) => {
//   res.redirect('/signup');
// });

module.exports = {signUp, login, logout};