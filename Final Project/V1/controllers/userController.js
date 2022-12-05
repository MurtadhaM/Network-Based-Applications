
// User Controller
// ==============
// This controller is used to handle all API requests
const User = require('../models/user');
const jwt = require('jsonwebtoken');
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
        res.render('login', {user: req.session.user});
    }


}

exports.register = (req, res) => {
    res.render('register',{user: req.session.user});

}
// Setting the JWT password
const JWT_SECRET = process.env.JWT_SECRET || 'p@ssw0rd'

const generateJWT = (user)=>{
   // Create JWT Payload
   const payload = {
    email: user.email,
    _id: user._id,
  };
  // Sign token
  const token = jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: 3600 },
  );
  return token;

}
exports.login = (req, res) => {
    // Check if username and password are present
    // PARSE THE JSON
    let email = req.body.email;
    let password = req.body.password;

    if (!req.body.email || !req.body.password) {
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
         
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if (isMatch) { 
            req.session.user = user;
            let token = generateJWT(user);
            res.status(200).json({ message: 'User logged in' , token: token});
             req.session.user =  user

        }
        else {
            return res.status(400).json({ message: 'User not found or password incorrect' });
        }
    }) 
    .catch(err => { 
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    });
    }



exports.register = (req, res) => {
     
    // Check if username and password are present
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    
    let  user ;
    

    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        console.log(`{ "message": "Missing email or password" } ${email} ${password}`);
        return res.status(400).json({ message: 'All fields are required' });
    } 
          user = new User({ 
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        

    

        // save the user
        user.save()
        .then(user => {
            req.session.user = user;
            res.status(200).json({ message: 'User created' });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: `Server Error: ${err.message}` });
        });
    }



        
    

    




exports.profile = (req, res) => {
    if (req.session.user) {
         
        res.render('profile', {user: req.session.user});
        }
    else {
        res.redirect('/users/login');
    }
    
}

exports.logout = (req, res) => {
    
    req.session.destroy();
    res.redirect('/users/login');
}

