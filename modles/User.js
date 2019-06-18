const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    userType: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    DOB: {type: Date, required: true},
    registerDate: {
        type: String, 
        default: new Date()
    },
    avatar: {type: String},
    numberOfTrips: {type: Number},
    numberOfKms: {type: Number},
    isActive: {type: Boolean, default: true}
})
const User = mongoose.model("User", UserSchema);

module.exports = {
    User, UserSchema
}