require("dotenv").config();
require("../config/database").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Ticket = require("../models/Ticket");
const User = require("../models/user");

// GETTING THE JWT SECRET KEY
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || "jwtPrivateKey";

const login = async (req, res) => {

try {
// Get user input
const {
email,
password
} = req.body;

// Validate user input
if (!(email && password)) {
res.status(400).send("All input is required");
}
// Validate if user exist in our database
const user = await User.findOne({
email
});

if (user && (await user.isValidPassword(password))) {
// Create token
const token = jwt.sign({
user_id: user._id,
email
},
jwtPrivateKey, {
expiresIn: "2h",
}
);

// save user token
user.token = token;
    
// Save user
await user.save();

// user
res.status(200).json(user).send("Login successful");
} else {
        res.status(400).send("Invalid Credentials");
    }
} catch (err) {
console.log(err);
}

};


const register = async (req, res) => {

try {
// Get user input
const {
firstName,
lastName,
email,
password
} = req.body || req.query;

// Validate user input
if (!(email && password && firstName && lastName)) {
res.status(400).send("All input is required");
}

// check if user already exist
// Validate if user exist in our database
const oldUser = await User.findOne({
email
});

if (oldUser) {
return res.status(409).send("User Already Exist. Please Login");
}


// Create user in our database
const user = await User.create({
firstName,
lastName,
email: email.toLowerCase(), // sanitize: convert email to lowercase
password: password,
});

// Create token
const token = jwt.sign({
user_id: user._id,
email
},
jwtPrivateKey, {
expiresIn: "2h",
}
);
// save user token
user.token = token;

// return new user
res.status(201).json(user);
} catch (err) {
console.log(err);
}

}



const logout = async (req, res) => {
try {
    // GET THE TOKEN FROM THE HEADER
    const token = req.header("Authorization").replace("Bearer ", "");
    // FIND
    const user
    = await User.findOne({
        token
    });
    // IF USER IS FOUND
    if (user) {

        //
        user.token = null;
        await user.save();
        res.status(200).send("Logout successful");
    } else {
        res.status(404).send("User not found");
    }
} catch (err) {

    res.status(500).send("Internal Server Error");
}

}


/**
 * EDIT USER
 */
const getAvailableTickets = async (req, res) => {

    
try {
    // GET ALL AVAILABLE TICKETS
    const tickets = await Ticket.find({
        isAvailable: true
    });


    res.status(200).json(tickets);
} catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
}
}


const getUserTickets = async (req, res) => {
    
try {
     
    // Get the Tickets from the user
    const tickets = await Ticket.find({
        user: req.user._id

    });
    res.status(200).json(tickets);
} catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
}
}

const addTicket = async (req, res) => {

    

    try {
        // Get user input
        const {
            title,
            description,
            price,
            isAvailable
        } = req.body;

        // Validate user input
        if (!(title && description && price && isAvailable)) {
            res.status(400).send("All input is required");
        }

        // Check if ticket already exist
        const oldTicket = await Ticket.findOne({
            title
        });

        if (oldTicket) {
            return res.status(409).send("Ticket Already Exist. Please Login");
        }

        // Create ticket in our database

        const ticket = await Ticket.create({
            title,
            description,
            price,
            isAvailable,
            user: req.user._id
        });

        // Save ticket
        await ticket.save();
        // return new ticket

        res.status(201).json(ticket);
    } catch (err) {

        res.status(500).send("Internal Server Error");
    }

}

const buyTicket = async (req, res) => {
     
    try {
        // Get user input
        const {
            ticketId,
            price
        } = req.body || req.query || req.params;


        // Validate user input
        if (!(ticketId || req.user._id || price )) {
            res.status(400).send("All input is required");

        }

        // Check if ticket already exist
        const ticket = await Ticket.findOne({
            _id: ticketId
        });

        if (!ticket) {
            return res.status(409).send("Ticket does not exist");
        }

        // Check if ticket is available
        if (!ticket.isAvailable) {
            return res.status(409).send("Ticket is not available");
        }

        


    



        // Update ticket
        ticket.isAvailable = false;
        ticket.user = req.user._id;
        await ticket.save();

        // return new ticket
        res.status(201).json(ticket);
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}




module.exports = {
login,
register,
logout,
getAvailableTickets,
getUserTickets,
addTicket,
buyTicket
};

        