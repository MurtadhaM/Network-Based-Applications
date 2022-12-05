

// API Controller
// ==============
// This controller is used to handle all API requests
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.api = (req, res) => {
    res.json({
        message: 'API is working'
    }); 
}; 

const createSession = (req, res) => {
    
    // Check if authorization header is set
    if (req.headers.authorization) {
        // Authorization header is set
        // Split at the space
        const bearer = req.headers.authorization.split(' ');
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true');
    res.append('Access-Control-Max-Age', '86400');
    res.append('Access-Control-Expose-Headers', 'Authorization');
    res.append('Access-Control-Expose-Headers', 'Content-Type');
    res.append('Access-Control-Expose-Headers', 'X-Requested-With');
    res.append('Access-Control-Expose-Headers', 'Accept');
};


const login = (req, res) => {
    // Check if username and password are present
    let email = req.query.email || req.body.email; 
    let password = req.query.password || req.body.password;
    
    if (!email|| !password) {
        console.log(`{ "message": "Missing email or password" } ${email} ${password}`);
        return res.status(400).json({ message: 'All fields are required' });
    }
    console.log(`{ "message": "User logged in" } ${email} ${password}`);
 
    // Check if user exists
    User.findOne({"email": email })
    .then(user => {
        if (!user) {
            
            return res.status(400).json({ message: 'User not found or password incorrect' });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) { 

        
            console.log(`{ "message": "User not found" } ${user.email} ${user.password}`); 
            if (isMatch) {
                console.log(`{ "message": "User logged in" } ${email} ${password}`);
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };
                // Sign token
                
                // Sign token
                jwt.sign(
                    payload,
                    secretOrPrivateKey = process.env.MONGO_SESSION_SECRET,
                        
                );
            } else {
                console.log(`{ "message": "User not found or password incorrect" } ${email} ${password}`);
                return res.status(400).json({ message: 'User not found or password incorrect' });
            } 
            
        } else {
            console.log(`{ "message": "User not found or password incorrect" } ${email} ${password}`);
            return res.status(400).json({ message: 'User not found or password incorrect' });

        }
        });
    };


const validate = (req, res) => {
    // Check if authorization header is set
    if (req.headers.authorization) {
        // Authorization header is set
        // Split at the space
        const bearer = req.headers.authorization.split(' ');
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}


const refresh = (req, res) => {
    // Check if authorization header is set
    if (req.headers.authorization) {
        // Authorization header is set
        // Split at the space
        const bearer = req.headers.authorization.split(' ');
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

const logout = (req, res) => {
    // Check if authorization header is set
    if (req.headers.authorization) {
        // Authorization header is set
        // Split at the space
        const bearer = req.headers.authorization.split(' ');
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

const getUser = (req, res) => {
    // Check if authorization header is set
    if (req.headers.authorization) {
        // Authorization header is set
        // Split at the space
        const bearer = req.headers.authorization.split(' ');
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

const createUser = (req, res) => {
    // Check if authorization header is set
    const JWT_SECRET = process.env.JWT_SECRET;

    // Check if username and password are present
    let email = req.query.email || req.body.email;
    let password = req.query.password || req.body.password;

    let lastName = req.query.lastName || req.body.lastName;
    let firstName = req.query.firstName || req.body.firstName;

    console.log(`{ "message": "User created" } ${email} ${password} ${lastName} ${firstName}`);
    if (!email || !password|| !lastName|| !firstName) {
        console.log(`{ "message": "Missing email or password" } ${email} ${password}`);
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    User.findOne
    ({ email })
    .then(user => {
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            email,
            password,
            lastName,
            firstName
        });
        // Save user
        newUser.save()
        .then(user => {

            console.log(`{ "message": "User created" } ${email} ${password}`);

            user.save() 

            return res.status(200).json({ message: 'User created' });
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ message: 'User not created' });
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'User not created' });
    });


}

    
const updateUser = (req, res) => {
    // Check if authorization header is set
    if (req.headers.authorization) {
        // Authorization header is set
        // Split at the space
        const bearer = req.headers.authorization.split(' ');
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
