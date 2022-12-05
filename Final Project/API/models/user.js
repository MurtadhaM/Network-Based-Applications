
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { use } = require("../routes/apiRoutes");
const Ticket = require("./Ticket");
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

// GETTING THE JWT SECRET KEY
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || "jwtPrivateKey";


userSchema.methods.isValidPassword = async function(password) {
const user
= this;
const compare = await bcrypt.compare(password, user.password);
return compare;
};

userSchema.pre("save", async function(next) {
const user
= this;
if (user.isModified("password")) {
user.password = await bcrypt.hash(user.password, 8);
}


next();
});


userSchema.methods.getTicket = async function() {
const user
= this;
const tickets = await Ticket.find({
user: user._id
});
return tickets;


};

module.exports = mongoose.model("user", userSchema);

