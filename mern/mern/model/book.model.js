const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookSchema = new Schema({
    bookId:{
        type:Number,
        required:true
    },
    bookName:{
        type:String,
        required:true
    },
    edition:{
        type:Number
    },
    author:{
        type:String
    },
    bookType:{
        //enum:['School Books','College Books','Reading Books','Exam Preparation Books'],
        type:String
       
    },
    bookCondition:{
        type:String,
        //enum:['Excellent','Good','Fair'],
       
    },
    rentoption:{
        type:String
    },

    yourPrice:{
        type:Number,
        required:true
    },
    shippingCharges:{
        type:Number,
    },
    bookimage:{
        data: Buffer,
        contentType: String

    },
    publisher:{
        type:String
    },
    description:{
        type:String
    },

    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
   


    
},{timestamps: true})


const Book = mongoose.model('Book',bookSchema);
module.exports = Book;