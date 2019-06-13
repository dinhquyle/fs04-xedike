const express = require("express");
const router = express.Router();
const {User} = require("../../modles/User");
const bcript = require("bcryptjs"); // cai dat npm i bcryptjs
const jwt = require("jsonwebtoken");// Cai dat npm i jsonwebtoken
const {authenticating, authorizasing} = require("../../middleware/auth");

/* app.get("/", (req, res) => {
    res.json({message: "Hello word"})
}) */

//middleware
/* router.get("/xyz", (req, res, next) => {
    console.log("Middleware 1")
    next()
}, (req, res, next) => {
    console.log("Middleware 2")
    next()
}, (req, res) => {
    res.send("Hello word")
}) */

// route POST /api/users/register
// Desc: register new user
//Access: PUBLIC

router.post("/register", (req, res) => {
    const {email, password, fullName, userType, phone, DOB} = req.body;

    // Gia dinh: input valid
    User.findOne({$or: [{email},{phone}]})
        .then(user => {
            if( user ) return Promise.reject({errors: "Email or phone exists" });
            const newUser = new User({
                email, password, fullName, userType, phone, DOB
            })
            bcript.genSalt(10, (err, salt) => {
                if( err) return Promise.reject(err);
                bcript.hash(password, salt, (err, hash) => {
                    if( err ) return Promise.reject(err);

                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.status(200).json(user))
                        .catch(err => res.status(400).json(err))
                })
            })
        })
        .catch( err => res.status(400).json(err));
        
})

// route POST /api/users/login
// Desc: Login
//Access: PUBLIC
// Auth: - Authentication: da dang nhap dang ky chua -Authorization: phan quyen

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
        .then(user => {
            if( !user ) return Promise.reject({ errors: "user does not exists"});
            bcript.compare(password, user.password, (err, isMatch) => {
                if( !isMatch) return res.status(400).json(err);//return Promise.reject({errors: "Wrpng password"})

                const payload = {
                    email: user.email,
                    fullName: user.fullName,
                    userType: user.userType
                }

                jwt.sign(payload, "Cybersoft", {expiresIn: "1h"}, (err, token) => {
                    if( err ) return res.status(400).json(err);
                    return res.status(200).json({
                        message: "success",
                        token
                    })
                });
               
            })
        })
        .catch( err => res.status(400).json(err));
})

// route POST /api/users/test-private
// Desc: test private
//Access: PRIVATE: chi cho nhung user nao da login moi xai dc

router.get("/test-private", 
    authenticating, 
    authorizasing(["admin", "coder22"]),
    (req, res) => {
    res.status(200).json({message: " ban da thay dc dieu bi mat"});
})

module.exports = router;