
// User Controller
// ==============
// This controller is used to handle all API requests
const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.api = (req, res) => {
    res.json({
        message: 'API is working'
    }); 
}; 


const LocalStrategy = require('passport-local').Strategy;
exports.login = (req, res) => {
    
    if (req.session.user)  {
        res.redirect('/users/profile') ;
         
    }
    else {
        res.render('login');
    }


}

exports.register = (req, res) => {
    res.render('register');

}

exports.loginPost = (req, res) => {
    // Check if username and password are present
    let email = req;
    let password = req.query.password;
    console.log(req.query);
    if (!req.query.email || !req.query.password) {
        console.log(`{ "message": "Missing email or password" } ${email} ${password}`);
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    User.findOne
    ({ email: req.body.email })
    .then(user => {
        if (!user) {
            
            return res.status(400).json({ message: 'User not found or password incorrect' });
        }
         
        const isMatch = bcrypt.compareSync(req.query.password, user.password);
        if (isMatch) { 

        
            console.log(`{ "message": "User not found" } ${user.email} ${user.password}`); 
            if (isMatch) {
                console.log(`{ "message": "User logged in" } ${email} ${password}`);
                return res.status(200).json({ message: 'User logged in' });
              
                

            } else {

                console.log(`{ "message": "User not found or password incorrect" } ${email} ${password}`);
                return res.status(400).json({ message: 'User not found or password incorrect' });
            }
        } else {
            console.log(`{ "message": "User not found or password incorrect" } ${email} ${password}`);
            return res.status(400).json({ message: 'User not found or password incorrect' });

        }
        });
    }



exports.registerPost = (req, res) => {
     
    // Check if username and password are present
    console.log(req.body);
    console.log(req.query);
    let email = req.body.email;
    let password = req.body.password;
    if (!req.body.email || !req.body.password) {
        console.log(`{ "message": "Missing email or password" } ${email} ${password}`);
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    User
 

}

exports.profile = (req, res) => {
    if (req.session.user) {
        res.render('profile');
    }
    else {
        res.redirect('/users/login');
    }
    
}

exports.logout = (req, res) => {
    
    req.session.destroy();

    
    res.redirect('/users/login');
}

