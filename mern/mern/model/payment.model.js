const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentMethod:{
        type:String,
        required:true
    },
    cardName:{
        type:String,
        required:true
    },
    cardNumber:{
        type:Number,
        required:true
    },
    expiryDate:{
        type:Number,
        required:true
    },
    cVV:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }

})
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;