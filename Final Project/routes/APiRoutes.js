
const express = require('express');
let router = express.Router();
const controller = require('../controllers/apiController');

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});


/**
 * Dwfine the routes for the API
 */

router.route('/').all( (req, res) => {

    res.send('Welcome to the API');
      
});
/**
 *  GET /api/players
 */
router.route('/login').all( (req, res) => {

    controller.login(req, res);
});



router.route('/register').all( (req, res) => {
    controller.createUser( req, res) ;
});


router.route('/logout').all( (req, res) => {

    controller.logout(req, res);
    
});




 
     


module.exports = router;
