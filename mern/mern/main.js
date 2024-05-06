
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/user.router');
const bookRoutes = require('./routes/book.router');
const paymentRoutes = require('./routes/payment.router');
const messageRoutes = require('./routes/message.router');
const session = require('express-session');
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart.router');
// const PORT = 8000;
// const mongoDBURL = "mongodb://127.0.0.1:27017/bookswapdatabase";

const app = express();

const SESSION_SECRET = 'mysecretkey';
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(flash());

app.use('/views', express.static(path.resolve(__dirname, "views")));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/uploads',express.static('uploads'))


// Define your routes after setting up middleware

app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', authRoutes);

// app.get('/', (req, res) => {
//     res.render('login');
// });

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/productpage', (req, res) => {
    res.render('book');
});

app.use(bookRoutes);
// app.use(cartRoutes);


// console.log('database', mongoDBURL);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to the database');
    })
    .catch((error) => {
        console.log(error);
    });

    app.listen(8000,()=>{
        console.log(`server is running on http://127.0.0.1:8000`);
    });
    
