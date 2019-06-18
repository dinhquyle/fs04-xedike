const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        let type = "";
        console.log(file);
        if( file.mimetype === 'aplication/octet-stream' || !file.mimetype) type = '.jpg'
        //throw new Error("sai duoi")
        req.errors = "sai file"
        
        cb(null, new Date().toISOString() + '-' + file.originalname + type)
    }  
})
const upload = multer({storage})
module.exports = upload;