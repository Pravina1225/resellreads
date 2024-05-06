const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    phone:{
        type:String,
       
    },
    email:{
        type:String,
       
    },
    gender:{
        type:String,
       
    },
    address:{
        type:String,
        
    },
    pinCode:{
        type:Number,
       
    }

})
const userProfile = mongoose.model('userProfile', UserSchema);
 module.exports = userProfile;