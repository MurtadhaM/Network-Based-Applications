
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
firstName: {
type: String,
required: [true, "first name is required"]
},
lastName: {
type: String,
required: [true, "last name is required"]
},
email: {
type: String,
required: [true, "email address is required"],
unique: [true, "this email address has been used"],
},
password: {
type: String,
required: [true, "password is required"]
},
date: {
type: Date,
default: Date.now
},
isActive: {
type: Boolean,
default: false
},

token: {
type: String
},
});

module.exports = mongoose.model("user", userSchema);

