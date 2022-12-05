const express = require('express');
const { session } = require('passport');
let router = express.Router();
const controller = require('../controllers/userController');
const User = require('../models/user');
const auth = require('../middlewares/Authentication');

/**
 * 
 */

 


router.route('/register').get(  (req, res) => {

    res.render('register',{user: req.session.user}); 
})

.put( (req, res) => {

    controller.register(req, res);
});

router.route('/login').get( (req,  res) => {

    res.render('login', {user: req.session.user}); 

})
.put( (req, res) => {
    controller.login(req, res);
})


router.route('/logout').get( (req, res) => {
    res.redirect('/logout');
});
 
router.route('/profile').get( (req, res) => {
    
    controller.profile(req, res);

});
 
router.route('/profile/edit').get( (req, res) => {
    
    res.render('profile',{user: req.session.user} );

}).put( (req, res) => {
    controller.editProfile(req, res);
});

module.exports = router;


