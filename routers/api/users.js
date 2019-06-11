const express = require("express");
const router = express.Router();
const {User} = require("../../modles/User");


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
    const newUser = new User({
        email, password, fullName, userType, phone, DOB
    })
    newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
})

module.exports = router;