const express = require("express");
const router = express.Router();
const {User} = require("../../modles/User");
const bcript = require("bcryptjs");


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

module.exports = router;