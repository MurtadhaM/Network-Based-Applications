

// API Controller
// ==============
// This controller is used to handle all API requests
const User = require('../models/user');

exports.api = (req, res) => {
    res.json({
        message: 'API is working'
    }); 
}; 



exports.login = (req, res) => {
    // Check if username and password are present
    let email = req.query.email;
    let password = req.query.password;
    if (!req.query.email || !req.query.password) {
        console.log(`{ "message": "Missing email or password" } ${email} ${password}`);
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    User.findOne
    ({ email: req.query.email })
    .then(user => {
        if (!user) {
            return res.status(400).json({ message: 'User not found or password incorrect' });
        }
         

        
        user.isMatch(req.query.password, user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'User not found or password incorrect' });
            }
            if (isMatch) {
                console.log(`{ "message": "User logged in" } ${email} ${password}`);
                return res.status(200).json({ message: 'User logged in' });
            } else {

                console.log(`{ "message": "User not found or password incorrect" } ${email} ${password}`);
                return res.status(400).json({ message: 'User not found or password incorrect' });
            }
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'User not found or password incorrect' });
    });
}


exports.validate = (req, res) => {
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


exports.refresh = (req, res) => {
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

exports.logout = (req, res) => {
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

exports.getUser = (req, res) => {
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

exports.createUser = (req, res) => {
    // Check if authorization header is set
    const JWT_SECRET = process.env.JWT_SECRET;


    // Check if username and password are present
    let email = req.query.email;
    let password = req.query.password;
    if (!req.query.email || !req.query.password) {
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
            password
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

    
exports.updateUser = (req, res) => {
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
