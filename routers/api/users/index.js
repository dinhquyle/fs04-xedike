const express = require("express");
const userController = require("./users");
const router = express.Router();
const {authenticating, authorizasing} = require("../../../middleware/auth");
const multer = require('multer');
const {User} = require("../../../modles/User");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/test-private", 
    authenticating, 
    authorizasing(["admin", "coder22"]),
    userController.testPrivate
);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        let type = "";
        if( file.mimetype === 'aplication/octet-stream' || !file.mimetype) type = '.jpg'
        cb(null, new Date().toISOString() + '-' + file.originalname + type)
    }
})
const upload = multer({storage})

router.post("/upload-avatar", 
    authenticating,
    upload.single('avatar'), (req, res, next) => {       
    /* return res.status(200).json({
        message: "success",
        file: req.file,
    })
    console.log(req.file) */
    console.log(req.user);
    const { id } = req.user;
    User.findById(id)
        .then(user => {
            if( !user ) return Promise.reject({errors: "cannot upload"})
            user.avatar = req.file.path
            return user.save()
        })
        .then( user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
})

module.exports = router;