const express = require('express');
let router = express.Router();
const controller = require('../controllers/userController');
const User = require('../models/user');


router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    
    next();
});




router.route('/register').get(  (req, res) => {

    res.render('register');
});


router.route('/register').post( (req, res) => {
    console.log(req);

    controller.registerPost(req, res);
});

router.route('/login').all( (req, res) => {

    controller.login(req, res);
});

router.route('/logout').all( (req, res) => {

    controller.logout(req, res);

});

router.route('/profile').post( (req, res) => {
     
    controller.profile(req, res);
});
router.route('/profile').get( (req, res) => {

    res.render('profile');
});

module.exports = router;


