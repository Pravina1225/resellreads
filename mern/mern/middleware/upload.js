// const path = require('path')
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'uploads/');
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + '-' + file.originalname);
        
//     },
// });
// const fileFilter = (req,file,cb)=>{
//     if
//     (file.mimetype.startsWith('image/')){
//     cb(null,true);
//     }else{
//         cb(new Error('File type not supported!'),false);
//     }
//     };


// const upload = multer({
//     storage: storage,fileFilter: fileFilter
    
// });
// Multer configurations
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });



module.exports = upload;