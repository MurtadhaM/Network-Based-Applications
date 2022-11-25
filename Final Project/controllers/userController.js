
// User Controller
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

exports.login = (req, res) => {
    if (req.session.user) {
        res.redirect('/users/profile') ;
         
    }
    else {
        res.render('login');
    }


}

exports.register = (req, res) => {
    res.render('register');

}

exports.loginPost = (req, res, next) => {
    // check if user exists
    User.findOne  ({email : req.body.email}, (err, user) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/users/login');
        }
 
        const bcrypt = require('bcrypt');
        // check if password matches
        const isvalid = bcrypt.compareSync(req.body.password, user.password);
        console.log(isvalid);
        if (!isvalid) {
            req.flash('error', 'Password does not match');
            const bcrypt = require('bcrypt');
            return res.redirect('/users/login');
        } 
        req.session.user = user;
        req.session.name = user.firstName;
        req.flash('success', 'You are now logged in');
        res.redirect('/users/profile');
    });
}
exports.registerPost = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        // check if all fields are filled
        req.flash('error', 'Please fill in all fields');
        
        return res.render('register', {errors: errors.array()});
    }
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    console.log(user);
    user.save()
    .then(() => {
        req.flash('success', 'You are now registered and can log in');
        // create a session
        req.session.user = user;
        req.session.name = user.firstName;
        res.redirect('/users/profile');
        
    })
    .catch(err => {
        res.send(err);
    })
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

